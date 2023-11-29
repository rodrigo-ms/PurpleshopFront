import { Component } from '@angular/core';
import {HostListener}from '@angular/core'
@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScrollTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkScrollTop() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollButton = document.querySelector('.scroll-to-top');

    if (scrollButton) {
      if (scrollPosition > 300) {
        scrollButton.classList.add('show');
      } else {
        scrollButton.classList.remove('show');
      }
    }
  }
}
