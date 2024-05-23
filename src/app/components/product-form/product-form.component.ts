import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup = this.fb.group({});
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.productForm?.patchValue(product as Product);
      });
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(160)]]
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get description() {
    return this.productForm.get('description');
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(this.productId, product).then(() => {
          this.router.navigate(['/products']);
        }).catch((error: any) => {
          alert(error);
        });
      } else {
        this.productService.addProduct(product).then(() => {
          this.router.navigate(['/products']);
        }).catch((error: any) => {
          alert(error);
        });
      }
    } else {
      this.validateAllFormFields(this.productForm);
      alert('Form is invalid. Please check the error messages.');
    }
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}