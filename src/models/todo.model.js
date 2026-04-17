import mongoose from "mongoose";

/**
 * TODO: Define Todo schema
 *
 * Fields:
 * - title: String, required, trim, min 3, max 120 chars
 * - completed: Boolean, default false
 * - priority: Enum ["low", "medium", "high"], default "medium"
 * - tags: Array of Strings, max 10 items, default []
 * - dueDate: Date, optional
 *
 * Options:
 * - Enable timestamps
 * - Add index: { completed: 1, createdAt: -1 }
 */

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "title is required"],
            minlength: [3, "title must be at least 3 characters"],
            maxLength: [120, "title must be at most 120 characters"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: String,
            enum: {
                values: ["low", "medium", "high"],
                message: "Priority must be low, medium, high",
            },
            default: "medium",
        },
        tags: {
            type: [String],
            validate: {
                validator: (arr) => arr.length <= 10,
                message: "Tags cannot have more than 10 items",
            },
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

// TODO: Add index

todoSchema.index({ completed: 1, createdAt: -1 });

// TODO: Create and export the Todo model

export const Todo = mongoose.model("todo", todoSchema);
