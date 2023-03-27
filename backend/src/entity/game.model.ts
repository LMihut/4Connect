import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
import { GameSettings } from "./gameSettings.model";
import { Move } from "./move.model";
import { Player } from "./player.model";

export const playerSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  //....
});

@Entity()
export class Game {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @CreateDateColumn()
  createdAt!: string;

  @ManyToOne (type => Player, player => player.id, {nullable: true})
  @JoinColumn() 
  winner?: Player;

  @ManyToMany (type => Player, player => player.games)
  @JoinTable()
  players!: Player[];

  @OneToMany (type => Move, move => move.game)
  @JoinColumn()
  moves!: Move[];

  @OneToMany (type => GameSettings, gamesettings => gamesettings.games)
  @JoinColumn()
  settings! : GameSettings;
  
}
