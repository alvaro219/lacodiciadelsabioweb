import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameDataService } from '../../services/game-data.service';
import { Guide } from '../../models/guide.model';

@Component({
  selector: 'app-guide-detail',
  imports: [RouterLink],
  templateUrl: './guide-detail.html',
  styleUrl: './guide-detail.scss'
})
export class GuideDetail {
  protected readonly guide = signal<Guide | undefined>(undefined);
  protected readonly allGuides;
  protected readonly activeSection = signal<string | null>(null);

  constructor(private route: ActivatedRoute, private gameData: GameDataService) {
    this.allGuides = this.gameData.getGuides();
    this.route.params.subscribe(params => {
      const g = this.gameData.getGuideById(params['id']);
      this.guide.set(g);
      this.activeSection.set(null);
      window.scrollTo({ top: 0 });
    });
  }

  scrollToSection(sectionId: string) {
    this.activeSection.set(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  downloadPdf() {
    const g = this.guide();
    if (g) {
      const link = document.createElement('a');
      link.href = g.pdfFile;
      link.download = g.name + '.pdf';
      link.click();
    }
  }
}
