export interface GameStep {
  player_id: string;
  color: string;
  x: number;
  y: number;
  step: number;
  date: number;
}

export enum GameStateEnum {
  NOT_STARTED,
  IN_PROGRESS,
  SUSPENDED,
  HAS_WINNER,
  TIE,
  INTERRUPTED,
}

export enum PlayerStateEnum {
  ACTIVE,
  FINISHED,
  NOT_STARTED,
}

export interface GameState {
  connect: number;
  winner: string | undefined;
  active_player: string;
  active_player_state: PlayerStateEnum;
  active_start: number | undefined;
  players: Map<string, Player>;
  state: GameStateEnum;
  steps: GameStep[];
  date: Date;
}

export interface Player {
  id: string;
  name: string;
  color: string;
  time: number;
  time_bonus: number;
  active: boolean;
}

interface Direction {
  x: number;
  y: number;
}

export class Game {
  private state: GameState;
  private readonly game_board: number[][];
  private directions: Direction[];
  private active_step: number | undefined;

  public boardHeight: number;
  public boardWidth: number;

  constructor(
    private width: number = 30,
    private height: number = 24,
    connect: number = 4,
    private default_background_color: string = "#00000000"
  ) {
    this.boardHeight = height;
    this.boardWidth = width;
    if (connect > width || connect > height) {
      throw new Error(`Win parameters exceed board!`);
    }

    this.state = {
      connect: connect,
      winner: undefined,
      active_player: undefined,
      players: new Map<string, Player>(),
      state: GameStateEnum.NOT_STARTED,
      steps: new Array<GameStep>(),
      date: new Date(),
    } as unknown as GameState;

    this.state.steps.push(this.start_step());

    this.game_board = new Array<number>(this.width)
      .fill(0)
      .map(() => new Array<number>(this.height).fill(0));

    this.directions = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: 0, y: -1 },
    ];
  }

  /**
   * Imports the state of the game received from the Server
   * @param game : GameState
   */
  public setGame(game: GameState) {
    this.state = game;

    for (let step: number = 1; step < this.state.steps.length; step++) {
      this.game_board[this.state.steps[step].x][this.state.steps[step].y] =
        step;
    }
  }

  /**
   * Provides the index of the last step to be displayed or undefined if now steps have been played.
   *
   * @return number | undefined - The index of the last step to be displayed
   */
  public reverseStep(): number | undefined {
    if (this.active_step === undefined) {
      this.active_step =
        this.state.steps.length <= 1 ? undefined : this.state.steps.length - 2;
    } else if (this.active_step > 0) {
      this.active_step--;
    }
    return this.active_step;
  }

  /**
   * Provides the index of the last step to be displayed or undefined if now steps have been played.
   *
   * @return number | undefined - The index of the last step to be displayed
   */
  public advanceStep(): number | undefined {
    if (this.active_step === undefined) {
      return this.state.steps.length <= 1
        ? undefined
        : this.state.steps.length - 1;
    } else if (this.active_step === this.state.steps.length - 2) {
      this.active_step = undefined;
      return this.state.steps.length - 1;
    }
    return ++this.active_step;
  }

  /**
   * resigns the given player.
   * @param loser : ID of the resigning player
   */
  public resignPlayer(loser: string) {
    if (loser === undefined || !this.state.players.has(loser)) {
      return;
    } else if (
      this.state.players.size < 2 &&
      this.state.state < GameStateEnum.HAS_WINNER
    ) {
      this.state.state = GameStateEnum.INTERRUPTED;
    } else if (this.state.players.size === 2) {
      this.state.state = GameStateEnum.HAS_WINNER;
      const keys = Array.from(this.state.players.keys());
      this.state.winner = keys[0] === loser ? keys[1] : keys[0];
    } else {
      this.state.players.get(loser)!.active = false;
      if (this.state.active_player === loser) {
        this.cyclePlayer();
      }
    }
  }

  public startGame() {
    if (this.state.state === GameStateEnum.NOT_STARTED) {
      let keys = Array.from(this.state.players.keys());
      let active_player = 0;
      for (let i: number = 0; i < keys.length; i++) {
        if (this.state.players.get(keys[i])!.active) {
          active_player++;
        }
      }
      if (active_player > 1) {
        this.state.state = GameStateEnum.IN_PROGRESS;
        return;
      }
    }
  }

  /**
   * Suspends the game.
   */
  public suspendGame() {
    this.state.state = GameStateEnum.SUSPENDED;
  }

  public resumeGame(): boolean {
    if (this.state.state === GameStateEnum.SUSPENDED) {
      this.state.state = GameStateEnum.IN_PROGRESS;
      return true;
    }
    return false;
  }

  public interruptGame() {
    this.state.state = GameStateEnum.INTERRUPTED;
  }

  /**
   * Adds or updates Player object for the game to use
   * @param id : string
   * @param name : string
   * @param color : string
   * @param time : number - Total time in ms
   * @param time_bonus : number (optional) - Default 3000(ms)
   */
  public addPlayer(
    id: string,
    name: string,
    color: string,
    time: number,
    time_bonus: number = 3000
  ) {
    this.state.players.set(id, {
      name: name,
      color: color,
      time: time,
      time_bonus: time_bonus,
      active: true,
    } as Player);
  }

  /**
   * Activates the next player in the game or sets the first player as active if none was active before.
   */
  public cyclePlayer() {
    let keys = Array.from(this.state.players.keys());

    for (let i: number = 0; i < keys.length; i++) {
      if (keys[i] === this.state.active_player) {
        keys = i - 1 < 0 ? keys : keys.slice(i).concat(keys.slice(0, i));
        let active_players = this.state.players.get(keys[0])!.active ? 1 : 0;

        for (let j: number = 1; j < keys.length; j++) {
          if (this.state.players.get(keys[j])!.active) {
            active_players++;
            if (this.state.active_player === keys[0]) {
              this.activatePlayer(keys[j]);
            }

            if (active_players > 1) {
              return;
            }
          }
        }
        if (this.state.active_player_state === PlayerStateEnum.ACTIVE) {
          this.stopPlayer();
        }
        if (this.state.state !== GameStateEnum.HAS_WINNER) {
          this.state.state = GameStateEnum.HAS_WINNER;
          this.state.winner = this.state.active_player;
        }
        return;
      }
    }
    for (let k: number = 0; k < keys.length; k++) {
      if (this.state.players.get(keys[k])!.active) {
        this.activatePlayer(keys[k]);
        return;
      }
    }
  }

  private start_step(): GameStep {
    return {
      player_id: "Board Dimensions",
      color: this.default_background_color,
      x: this.width,
      y: this.height,
      step: 0,
      date: this.state.date.getTime(),
    };
  }

  private create_step(x: number, y: number, timestamp?: number): GameStep {
    return {
      player_id: this.state.active_player!,
      color: this.state.players.get(this.state.active_player!)!.color,
      x: x,
      y: y,
      step: this.state.steps.length - 1,
      date: timestamp === undefined ? new Date().getTime() : timestamp,
    };
  }

  private check_active_player(): boolean {
    if (this.state.active_player) {
      return true;
    }
    throw new Error(`No player was set as active!`);
  }

  public resetCurrentStep() {
    this.active_step = undefined;
  }

  public gotoFirstStep() {
    if(this.state.steps.length > 1){
      this.active_step = 0;
    }
  }

  /**
   * Marks the player with the given ID as active.
   * Sets the game state as IN_PROGRESS.
   * The next move will be performed as the active player.
   * @param id : string
   */
  public activatePlayer(
    id: string = this.state.active_player,
    timestamp?: number
  ) {
    if (this.state.state !== GameStateEnum.IN_PROGRESS) {
      return;
    }
    if (this.state.players.get(id) === undefined) {
      throw new Error(`Player with that ID does not exist!`);
    } else {
      this.state.active_player_state = PlayerStateEnum.ACTIVE;
      this.state.active_player = id;
      this.state.active_start =
        timestamp === undefined ? new Date().getTime() : timestamp;
    }
  }

  /**
   * Sets active_player_state to FINISHED and performs game-over checks.
   *
   * @param add_bonus_time : boolean - Decides whether to add the time_bonus defined for the active player.
   */
  public stopPlayer(add_bonus_time: boolean = false, timestamp?: number) {
    if (this.state.active_player !== undefined) {
      let time_bonus = add_bonus_time
        ? this.state.players.get(this.state.active_player!)!.time_bonus
        : 0;
      let stop_time =
        timestamp === undefined ? new Date().getTime() : timestamp;
      this.state.players.get(this.state.active_player!)!.time +=
        time_bonus - (stop_time - this.state.active_start!);
      this.has_winner(
        this.state.steps[this.state.steps.length - 1].x,
        this.state.steps[this.state.steps.length - 1].y
      );
      this.state.active_player_state = PlayerStateEnum.FINISHED;
      this.state.active_start = undefined;
    }
  }

  /**
   * Attempts to insert a piece in the given column as the active player.
   * Returns GameStep when successful or undefined if failed.
   *
   * Sets active_player to undefined.
   * @param column : number
   * @param player_id : string - Verifies that the given player_id is the currently active player
   *
   * @param timestamp : number - optional timestamp for step, otherwise new Date().getTime()
   * @exception Error if no active player is set.
   *
   * @return GameStep | undefined
   */
  public insert(
    column: number,
    player_id?: string,
    timestamp?: number
  ): GameStep | undefined {
    if (
      this.state.state !== GameStateEnum.IN_PROGRESS ||
      (player_id !== undefined && player_id !== this.state.active_player)
    ) {
      return undefined;
    }
    this.check_active_player();

    let row: number = 0;
    while (this.game_board[column][row] !== 0) {
      row++;
      if (row === this.height) {
        return undefined;
      }
    }
    this.state.steps.push(this.create_step(column, row, timestamp));
    this.game_board[column][row] = this.state.steps.length - 1;

    this.stopPlayer(true);
    this.cyclePlayer();

    return this.state.steps[this.state.steps.length - 1];
  }

  private has_winner(
    x: number,
    y: number,
    player_id: string = this.state.steps[this.state.steps.length - 1].player_id
  ): boolean {
    this.directions.forEach((direction) => {
      if (this.state.steps.length - 1 === this.width * this.height) {
        this.state.state = GameStateEnum.TIE;
        return;
      }
      let points = 0;
      let xi = x;
      let yi = y;
      while (
        Game.in_range(xi, this.width) &&
        Game.in_range(yi, this.height) &&
        this.state.steps[this.game_board[xi][yi]].player_id === player_id
      ) {
        if (++points === this.state.connect) {
          this.state.state = GameStateEnum.HAS_WINNER;
          this.state.winner = player_id;
          return true;
        }
        xi += direction.x;
        yi += direction.y;
      }
    });
    return false;
  }

  private static in_range(x: number, exclMax: number, incMin: number = 0) {
    return x >= incMin && x < exclMax;
  }

  /**
   * Returns the steps of the game, with the first element representing the board dimensions.
   *
   * @return GameStep[]
   */
  public get gameSteps(): GameStep[] {
    return this.state.steps;
  }

  /**
   * Returns the current game state
   *
   * @return GameState
   */
  public get getGameState(): GameState {
    return this.state;
  }

  public get gameBoard(): number[][] {
    return this.game_board;
  }

  public getPlayer(id: string): Player {
    return this.state.players.get(id)!;
  }

  public get activeStep(): number | undefined {
    return this.active_step;
  }

  public get activePlayer(): string {
    return this.state.active_player;
  }

  public get gameState(): GameStateEnum {
    return this.state.state;
  }

  public get winner(): string | undefined {
    return this.state.winner;
  }

  public get players(): Player[] {
    return Array.from(this.state.players.values());
  }

  public get playerIds(): string[] {
    return Array.from(this.state.players.keys());
  }

  public getCurrentStep(): number {
    return this.active_step === undefined
      ? this.state.steps.length - 1
      : this.active_step;
  }

  public getTotalStep(): number {
    return this.state.steps.length - 1;
  }
}
