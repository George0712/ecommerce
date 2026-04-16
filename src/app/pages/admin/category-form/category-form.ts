import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CategoryService, Category } from '../../../shared/services/category.service';

@Component({
  selector: 'app-category-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Editing state
  isEditing = false;
  editingId: number | null = null;

  // Form fields
  categoryName = '';
  categorySlug = '';
  categoryDescription = '';
  categoryImage = signal<string>('');
  categoryIcon = '';
  categoryStatus: 'activa' | 'inactiva' = 'activa';
  categoryOrder = '';

  // Media
  dragOver = signal(false);

  // SEO
  seoTitle = '';
  seoDescription = '';

  readonly iconOptions = [
    'steps', 'checkroom', 'styler', 'accessibility_new',
    'apparel', 'backpack', 'shopping_bag', 'sports_soccer',
    'fitness_center', 'surfing', 'pool', 'skateboarding',
    'sports_tennis', 'hiking', 'self_improvement', 'watch',
    'category', 'diamond', 'star', 'local_offer',
    'favorite', 'bolt', 'eco', 'palette',
  ];

  constructor() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      const category = this.categoryService.categories().find(c => c.id === +id);
      if (category) {
        this.isEditing = true;
        this.editingId = category.id;
        this.categoryName = category.name;
        this.categorySlug = category.slug;
        this.categoryDescription = category.description;
        this.categoryImage.set(category.image);
        this.categoryIcon = category.icon;
        this.categoryStatus = category.status;
        this.categoryOrder = String(category.order);
      }
    }
  }

  get pageTitle(): string {
    return this.isEditing ? 'Editar Categoría' : 'Nueva Categoría';
  }

  get pageSubtitle(): string {
    return this.isEditing
      ? 'Modifica la información de la categoría'
      : 'Completa la información para crear una categoría';
  }

  // Slug
  generateSlug() {
    this.categorySlug = this.categoryName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  onNameChange() {
    if (!this.categorySlug || !this.isEditing) {
      this.generateSlug();
    }
    if (!this.seoTitle) {
      this.seoTitle = this.categoryName;
    }
  }

  // Image upload
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(true);
  }

  onDragLeave() {
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.categoryImage.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  addDemoImage() {
    const demoImages = [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop',
    ];
    const random = demoImages[Math.floor(Math.random() * demoImages.length)];
    this.categoryImage.set(random);
  }

  removeImage() {
    this.categoryImage.set('');
  }

  // Save
  saveCategory() {
    if (!this.categoryName.trim()) return;

    if (this.isEditing && this.editingId !== null) {
      this.categoryService.updateCategory(this.editingId, {
        name: this.categoryName,
        slug: this.categorySlug,
        description: this.categoryDescription,
        image: this.categoryImage() || 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=400&auto=format&fit=crop',
        icon: this.categoryIcon || 'category',
        status: this.categoryStatus,
        order: parseInt(this.categoryOrder) || 0,
      });
    } else {
      this.categoryService.addCategory({
        name: this.categoryName,
        slug: this.categorySlug,
        description: this.categoryDescription,
        image: this.categoryImage() || 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=400&auto=format&fit=crop',
        icon: this.categoryIcon || 'category',
        parentId: null,
        status: this.categoryStatus,
        productCount: 0,
        order: parseInt(this.categoryOrder) || this.categoryService.categories().length + 1,
        createdAt: new Date().toISOString().split('T')[0],
      });
    }

    this.router.navigate(['/admin/categorias']);
  }

  saveDraft() {
    this.categoryStatus = 'inactiva';
    this.saveCategory();
  }
}
