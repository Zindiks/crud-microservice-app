import { Table, Column, Model, DataType, Unique } from "sequelize-typescript";

interface OrdersAttributes {
  id?: number;
  user_id: number;
  number_of_items: number;
  total_amount: number;
}

@Table
export class Orders extends Model<OrdersAttributes> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number_of_items!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total_amount!: number;
}
