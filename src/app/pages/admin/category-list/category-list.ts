import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList {
  private categoryService = inject(CategoryService);

  searchQuery = '';
  selectedStatus = '';
  selectAll = signal(false);
  selectedIds = signal<Set<number>>(new Set());
  currentView = signal<'grid' | 'table'>('table');

  // Delete confirm
  showDeleteConfirm = signal(false);
  deletingCategoryId = signal<number | null>(null);

  readonly statuses = ['activa', 'inactiva'];

  get categories(): Category[] {
    return this.categoryService.categories();
  }

  get filteredCategories(): Category[] {
    return this.categories.filter(c => {
      const matchesSearch =
        !this.searchQuery ||
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.slug.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = !this.selectedStatus || c.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  get totalCategories(): number {
    return this.categories.length;
  }

  get activeCategories(): number {
    return this.categories.filter(c => c.status === 'activa').length;
  }

  get inactiveCategories(): number {
    return this.categories.filter(c => c.status === 'inactiva').length;
  }

  get totalProducts(): number {
    return this.categories.reduce((sum, c) => sum + c.productCount, 0);
  }

  // Selection
  toggleSelectAll() {
    if (this.selectAll()) {
      this.selectedIds.set(new Set());
      this.selectAll.set(false);
    } else {
      const allIds = new Set(this.filteredCategories.map(c => c.id));
      this.selectedIds.set(allIds);
      this.selectAll.set(true);
    }
  }

  toggleSelect(id: number) {
    const current = new Set(this.selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIds.set(current);
    this.selectAll.set(current.size === this.filteredCategories.length);
  }

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  // Status
  getStatusClass(status: string): string {
    return status === 'activa' ? 'status-active' : 'status-inactive';
  }

  toggleCategoryStatus(id: number) {
    this.categoryService.toggleStatus(id);
  }

  // View
  setView(view: 'grid' | 'table') {
    this.currentView.set(view);
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedStatus = '';
  }

  // Delete
  confirmDelete(id: number) {
    this.deletingCategoryId.set(id);
    this.showDeleteConfirm.set(true);
  }

  cancelDelete() {
    this.deletingCategoryId.set(null);
    this.showDeleteConfirm.set(false);
  }

  executeDelete() {
    const id = this.deletingCategoryId();
    if (id !== null) {
      this.categoryService.deleteCategory(id);
      this.selectedIds.update(ids => {
        const newIds = new Set(ids);
        newIds.delete(id);
        return newIds;
      });
    }
    this.cancelDelete();
  }

  bulkDelete() {
    const ids = this.selectedIds();
    ids.forEach(id => this.categoryService.deleteCategory(id));
    this.selectedIds.set(new Set());
    this.selectAll.set(false);
  }
}
