// 代码生成时间: 2025-08-29 05:54:51
import { Injectable } from '@angular/core';

// Define the data model interface
export interface DataModel {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataModelService {
  // Store the data models in an array
  private models: DataModel[] = [];

  constructor() {
    // Initialize the models array with some sample data
    this.models = [
      { id: 1, name: 'Model 1', description: 'Description for Model 1' },
      { id: 2, name: 'Model 2', description: 'Description for Model 2' }
    ];
  }

  // Fetch all data models
  getAllModels(): DataModel[] {
    try {
      return this.models;
    } catch (error) {
      console.error('Failed to fetch models:', error);
      throw new Error('Failed to fetch models');
    }
  }

  // Get a single data model by ID
  getModelById(id: number): DataModel | undefined {
    try {
      return this.models.find(model => model.id === id);
    } catch (error) {
      console.error('Failed to fetch model by ID:', error);
      throw new Error('Failed to fetch model by ID');
    }
  }

  // Add a new data model
  addModel(model: DataModel): void {
    try {
      this.models.push(model);
    } catch (error) {
      console.error('Failed to add model:', error);
      throw new Error('Failed to add model');
    }
  }

  // Update an existing data model by ID
  updateModel(id: number, updatedModel: DataModel): void {
    try {
      const index = this.models.findIndex(model => model.id === id);
      if (index !== -1) {
        this.models[index] = updatedModel;
      } else {
        throw new Error('Model not found');
      }
    } catch (error) {
      console.error('Failed to update model:', error);
      throw new Error('Failed to update model');
    }
  }

  // Remove a data model by ID
  removeModel(id: number): void {
    try {
      this.models = this.models.filter(model => model.id !== id);
    } catch (error) {
      console.error('Failed to remove model:', error);
      throw new Error('Failed to remove model');
    }
  }
}
