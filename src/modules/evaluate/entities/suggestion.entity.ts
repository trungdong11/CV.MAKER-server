import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, JoinColumn } from 'typeorm';
import { EvaluateSection } from './evaluate-section.entity';

@Entity('suggestion')
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  issue: string;

  @Column({ nullable: true })
  suggestion: string;

  @Column({ type: 'uuid' })
  evaluate_section_id: string;

  @ManyToOne(() => EvaluateSection, (section) => section.suggestionsEntities, { nullable: false })
  @JoinColumn({ name: 'evaluate_section_id' })
  evaluate_section: Relation<EvaluateSection>;
}