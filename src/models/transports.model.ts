import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Spot } from 'src/models/spots.model';

interface TransportCreationAttrs {
  plate: string;
  size: number;
  spotId: number;
}

@Table({ tableName: 'transports' })
export class Transport extends Model<Transport, TransportCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  plate: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  size: number;

  @ForeignKey(() => Spot)
  @Column({ type: DataType.INTEGER, allowNull: false })
  spotId: number;

  @BelongsTo(() => Spot)
  spot: Spot;
}
