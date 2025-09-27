import mongoose, { Schema, Document, Types } from 'mongoose';
import { Event } from '../../shared/types';

/**
 * Interface for Event document
 */
export interface IEventDocument extends Omit<Event, '_id'>, Document {}

/**
 * Event schema definition
 * Manages school events and calendar activities
 */
const EventSchema = new Schema<IEventDocument>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title must be less than 200 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description must be less than 1000 characters'],
  },
  eventDate: {
    type: Date,
    required: [true, 'Event date is required'],
  },
  endDate: {
    type: Date,
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location must be less than 200 characters'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by user is required'],
  },
  attendees: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['academic', 'sports', 'cultural', 'administrative', 'other'],
    default: 'other',
  },
}, {
  timestamps: true,
  collection: 'events',
});

/**
 * Indexes for better query performance
 */
EventSchema.index({ eventDate: 1 });
EventSchema.index({ endDate: 1 });
EventSchema.index({ isPublished: 1 });
EventSchema.index({ category: 1 });
EventSchema.index({ createdBy: 1 });
EventSchema.index({ title: 'text', description: 'text' }); // Text search

/**
 * Virtual for checking if event is upcoming
 */
EventSchema.virtual('isUpcoming').get(function(this: IEventDocument) {
  return this.eventDate > new Date();
});

/**
 * Virtual for checking if event is current (happening now)
 */
EventSchema.virtual('isCurrent').get(function(this: IEventDocument) {
  const now = new Date();
  if (this.endDate) {
    return this.eventDate <= now && this.endDate >= now;
  }
  // If no end date, consider it current if it's today
  const eventDateOnly = new Date(this.eventDate.toDateString());
  const nowDateOnly = new Date(now.toDateString());
  return eventDateOnly.getTime() === nowDateOnly.getTime();
});

/**
 * Validation for end date (must be after start date)
 */
EventSchema.pre('validate', function(next) {
  if (this.endDate && this.eventDate && this.endDate < this.eventDate) {
    next(new Error('End date must be after event date'));
  } else {
    next();
  }
});

/**
 * Transform output to format _id
 */
EventSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret: any) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

/**
 * Event model export
 */
export const EventModel = mongoose.model<IEventDocument>('Event', EventSchema);