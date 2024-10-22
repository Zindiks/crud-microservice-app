import { Table, Column, Model, DataType, Unique } from "sequelize-typescript"

interface MovieAttributes {
  title: string
  description: string
}

@Table
export class Movies extends Model<MovieAttributes> {
  @Unique
  @Column(DataType.TEXT)
  title!: string

  @Column
  description!: string
}
