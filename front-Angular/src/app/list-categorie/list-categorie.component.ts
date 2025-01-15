import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../Categorie';
import { DatePipe } from '@angular/common'; // Importer DatePipe

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css'],
  providers: [DatePipe]  // Ajouter DatePipe aux fournisseurs
})
export class ListCategorieComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  // Méthode pour formater la date
  formatDate(date: number[]): string {
    // Convertir la date au format string, vous pouvez ajuster selon le format que vous souhaitez
    const dateStr = new Date(date[0], date[1] - 1, date[2]); // Convertir tableau [année, mois, jour] en objet Date
    return this.datePipe.transform(dateStr, 'dd/MM/yyyy') || ''; // Utiliser DatePipe pour formater
  }

  deleteCategorie(id: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (confirmation) {
      this.categorieService.deleteCategorie(id).subscribe(
        () => {
          this.categories = this.categories.filter(c => c.id !== id);  // Supprimer la catégorie de la liste
        },
        (error) => {
          console.error('Erreur lors de la suppression de la catégorie', error);
        }
      );
    }
  }
}
