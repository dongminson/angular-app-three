import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
    imports: [    
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
    ]
})

export class MaterialModule {}