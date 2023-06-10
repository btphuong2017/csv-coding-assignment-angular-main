import {
  trigger,
  query,
  style,
  animate,
  transition,
  animateChild,
  group
} from '@angular/animations';

export const layoutAnimations = trigger('routeAnimations', [
  transition("* => MainLayout", [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      query('.main-sider', [
        style({
          position: 'relative',
          top: 0,
          bottom: 0,
          left: 0
        }),
      ]),
      query('.main-header', [
        style({
          position: 'relative',
          top: 0,
          left: 0,
          right: 0,
          marginLeft: '-200px'
        }),
      ]),
      query('.main-footer', [
        style({
          position: 'relative',
          left: '200px',
          bottom: 0,
          right: 0
        }),
      ])
    ]),
    query(':enter', [
      query('.main-sider', [
        style({
          transform: 'translateX(-100%)'
        }),
      ]),
      query('.main-header', [
        style({
          transform: 'translateY(-100%)'
        }),
      ]),
      query('.main-footer', [
        style({
          transform: 'translateY(100%)'
        }),
      ])
    ]),
    query(':enter', [
      group([
        query('.main-sider', [
          animate('300ms ease-out', style({ transform: 'translateX(0)' }))
        ]),
        query('.main-header', [
          animate('300ms ease-out', style({  transform: 'translateY(0)' }))
        ]),
        query('.main-footer', [
          animate('300ms ease-out', style({  transform: 'translateY(0)' }))
        ])
      ])
    ])
  ])
]);