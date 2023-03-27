import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
import { Game } from "./game.model";

export const playerSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  //....
});

@Entity()
export class GameSettings {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column()
  boardWidth!: number;

  @Column()
  boardHeight!: number;

  @Column()
  rowsToWin!: number;

  @Column()
  gameMode!: string;

  @Column()
  bestOf!: number;

  @Column()
  rated!: boolean;

  @ManyToOne (type => Game, game => game.settings)
  games!: Game[];

  
}
