import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbs: Array<any> = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.breadcrumbs = [];
      let currentRoute = this.activatedRoute.root,
        url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        childrenRoutes.forEach((route) => {
          if (route.outlet === 'primary') {
            if (route.snapshot.data.title) {
              const routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map((segment) => segment.path).join('/');
              this.breadcrumbs.push({
                label: route.snapshot.data.title,
                url: url
              });
            }
            currentRoute = route;
          }
        });
      } while (currentRoute);
    });
  }

}
