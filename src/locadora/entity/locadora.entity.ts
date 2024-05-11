import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'films' })
export class FilmEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'sinopse', nullable: false })
  sinopse: string;

  @Column({ name: 'director', nullable: false })
  director: string;

  @Column({ name: 'actors' })
  actors: string;

  @Column({ name: 'release_date', nullable: false })
  release_date: Date;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Date;
  
} 