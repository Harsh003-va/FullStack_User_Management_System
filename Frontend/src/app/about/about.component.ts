import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    // Photo animation
    trigger('photoAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.5) rotate(-10deg)',
        }),
        animate(
          '800ms 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({
            opacity: 1,
            transform: 'scale(1) rotate(0)',
          })
        ),
      ]),
    ]),

    // Text container animation
    trigger('textAnimation', [
      transition(':enter', [
        query('h1, h3', [
          style({
            opacity: 0,
            transform: 'translateY(-30px)',
          }),
          stagger(100, [
            animate(
              '600ms ease-out',
              style({
                opacity: 1,
                transform: 'translateY(0)',
              })
            ),
          ]),
        ]),
      ]),
    ]),

    // Paragraph animation
    trigger('paragraphAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-20px)',
        }),
        animate(
          '600ms 500ms ease-out',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          })
        ),
      ]),
    ]),

    // Skills section animation
    trigger('skillsAnimation', [
      transition(':enter', [
        query('h4', [
          style({ opacity: 0 }),
          animate('300ms 800ms ease-out', style({ opacity: 1 })),
        ]),
      ]),
    ]),

    // Skill bubble animation
    trigger('skillBubbleAnimation', [
      transition(
        ':enter',
        [
          style({
            opacity: 0,
            transform: 'scale(0)',
          }),
          animate(
            '500ms {{delay}}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            keyframes([
              style({ opacity: 0, transform: 'scale(0)', offset: 0 }),
              style({ opacity: 0.5, transform: 'scale(1.2)', offset: 0.5 }),
              style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
            ])
          ),
        ],
        { params: { delay: 0 } }
      ),
    ]),

    // Social links container animation
    trigger('socialLinksAnimation', [
      transition(':enter', [
        query('.social-icon', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate(
              '400ms ease-out',
              style({
                opacity: 1,
                transform: 'translateY(0)',
              })
            ),
          ]),
        ]),
      ]),
    ]),

    // Individual social icon animation
    trigger('socialIconAnimation', [
      transition(
        ':enter',
        [
          style({
            opacity: 0,
            transform: 'rotate(0) scale(0)',
          }),
          animate(
            '500ms {{delay}}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            style({
              opacity: 1,
              transform: 'rotate(360deg) scale(1)',
            })
          ),
        ],
        { params: { delay: 0 } }
      ),
    ]),
  ],
})
export class AboutComponent {
  skills = [
    'Angular',
    'React',
    'JavaScript',
    'Java',
    'Spring Boot',
    'MySQL',
    'Oracle',
  ];
}
