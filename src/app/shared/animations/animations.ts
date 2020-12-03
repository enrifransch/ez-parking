import {animate, style, transition, trigger} from '@angular/animations';

export const upDownAnimation = trigger(
  'upDownAnimation',
  [
    transition(
      ':enter',
      [
        style({height: 0}),
        animate('0.25s ease-out',
          style({height: '40vh'}))
      ]
    ),
    transition(
      ':leave',
      [
        style({height: '40vh'}),
        animate('0.25s ease-in',
          style({height: 0}))
      ]
    )
  ]
);
