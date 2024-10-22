import { Table, Column, Model, DataType } from "sequelize-typescript"

interface MovieAttributes {
    name: string
    description: string
}

@Table
export class Movies extends Model<MovieAttributes> {
  @Column(DataType.TEXT)
  name!: string

  @Column
  description!: string
}
