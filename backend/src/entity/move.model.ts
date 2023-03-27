import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as yup from "yup";
import { Game } from "./game.model";
import { Player } from "./player.model";

export const playerSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  //....
});

@Entity()
export class Move {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /* @ManyToOne(type => Player, player => player.moves)
  player!: Player; */

  @ManyToOne(type => Game, game => game.moves)
  @JoinColumn()
  game!: Game;
  
  @Column()
  position!: string;

  @Column()
  counter!: number;
  
  @CreateDateColumn()
  createdAt!: string;
}
