import { trigger, transition, style, animate, state, query, animateChild, group, sequence, stagger, keyframes, animation, useAnimation } from "@angular/animations";

export const fadeAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        style({opacity: 0}),
        animate('500ms', style({opacity: 1}))
    ])
]);

export const DivFadeAnimation = trigger('divFadeAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(
            '200ms ease-in',
            style({ opacity: 1 })
        ),
    ]),
    transition(':leave', [
        animate(
            '200ms ease-in',
            style({ opacity: 0 })
        ),
    ])
]);

export const fadeInRightExpert = 
    trigger('fadeInRightExpert', [
      state('hidden', style({ opacity: 0, transform: 'translateX(75%)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('0.5s ease-out')])
    ]);

export const fadeInLeftExpert = 
    trigger('fadeInLeftExpert', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-75%)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', [animate('0.5s ease-out')])
    ]);


export const MenuSlide = trigger('menuSlide', [
    state('in', style({
        'transform': 'translateX(0)'
    })),
    state('out', style({
        'transform': 'translateX(399px)'
    })),
    state('bunch-key-out', style({
        'transform': 'translateX(435px)'
    })),
    state('mobile-out', style({
        'transform': 'translateX(100%)'
    })),
    transition('* => *', [
      animate('200ms')
    ])
]);

export const VisibilityAnimation = trigger('visibilityAnimation', [
    state('in', style({
        opacity: 1
    })),
    state('out', style({
        opacity: 0
    })),
    transition('* <=> *', [
      animate('200ms')
    ])
]);

export const slideInOutAnimation = trigger('slideInOut', [
    state('in', style({
        'max-height': '500px', opacity: 1, visibility: 'visible'
    })),
    state('out', style({
        'max-height': '0px', opacity: 0, visibility: 'hidden'
    })),
    transition('in => out', [
      animate('1ms 10ms')
    ]),
    transition('out => in', [
      animate('0.5s 10ms')
    ])
]);


// one
export const Container = [
	trigger('container', [
		transition(':enter, :leave', [
			query('@*', animateChild()),
		]),
	]),
];

export const EnterExitLeft = [
    trigger('enterExitLeft', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(-200px)' }),
            animate(
                '300ms ease-in',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
    	]),
	    transition(':leave', [
            animate(
                '300ms ease-in',
                style({ opacity: 0, transform: 'translateX(-200px)' })
            ),
	    ])
    ])
];


export const DelayShow = [
    trigger('delayShow', [
        transition(':enter', [
            style({ visibility: 'hidden'}),
            animate(
                '100ms 200ms ease-in',
                style({ visibility: 'visible'})
            )
        ])
    ])
];

export const SlideInDown = [
    trigger('slideInDown', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(
                '200ms',
                style({ opacity: 1 })
            )
    	]),
	    transition(':leave', [
            animate(
                '100ms',
                style({ opacity: 0 })
            )
	    ])
    ]),
];
export const EnterExitRight = [
    trigger('enterExitRight', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateX(200px)' }),
            animate(
                '300ms ease-in',
                style({ opacity: 1, transform: 'translateX(0)' })
            ),
        ]),
        transition(':leave', [
            animate(
                '300ms ease-in',
                style({ opacity: 0, transform: 'translateX(200px)' })
	        ),
        ]),
	]),
];

// two
export const fadeSlideInOutAnimation = trigger('fadeSlideInOut', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(10px)' }),
		animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
	transition(':leave', [
		animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
	]),
]);

// three
export const three = trigger('enabledStateChange', [
    state(
      'default',
      style({
          opacity: 1,
      })
  ),
  state(
      'disabled',
      style({
          opacity: 0.5,
      })
    ),
    transition('* => *', animate('300ms ease-out')),
]);

// four
const ShakeAnimation = [
	style({ transform: 'rotate(0)' }),
	animate('0.1s', style({ transform: 'rotate(2deg)' })),
	animate('0.1s', style({ transform: 'rotate(-2deg)' })),
	animate('0.1s', style({ transform: 'rotate(2deg)' })),
	animate('0.1s', style({ transform: 'rotate(0)' })),
];
export const QueryShake = [
	trigger('queryShake', [
		transition('* => default', [query('.card', ShakeAnimation)]),
	]),
];

// four with limit
export const QueryShakeLimit = [
	trigger('queryShake', [
		transition('* => withLimit', [
			query('.card', ShakeAnimation, {
				limit: 2,
			}),
		]),
	]),
];

// five : Route
const resetRoute = [
    style({ position: 'relative' }),
    query(
        ':enter, :leave',
	    [
        	style({
                position: 'fixed', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
                top: 0, // adjust this if you have a header so it factors in the height and not cause the router outlet to jump as it animates
                left: 0,
                width: '100%',
                opacity: 0,
            }),
    	],
	    { optional: true }
    ),
];

export const route = trigger('routeFadeAnimation', [
    transition('* => *', [
        ...resetRoute,
        query(':enter', [style({ opacity: 0 })], {
        	optional: true,
        }),
        group([
            query(
                ':leave',
                [style({ opacity: 1 }), animate('0.2s', style({ opacity: 0 }))],
                { optional: true }
            ),
            query(
                ':enter',
                [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
                { optional: true }
            ),
        ]),
    ]),
]);

// Or:
// trigger('routeAnimation', [
//     transition('home => post', []),
// 	transition('post => home', []),
// ]);

// Seven: Sequence
export const group33 = trigger('fadeInGrow', [
        transition(':enter', [
            query(':enter', [
                style({ opacity: 0, transform: 'scale(0.8)'  }),
                group([
                    animate('500ms', style({ opacity: 1 })),
                    animate('200ms ease-in', style({ transform: 'scale(1)' }))
                ])
            ])
        ])
    ])

export const sequence33 = trigger('fadeInGrow', [
            transition(':enter', [
                query(':enter', [
                    style({ opacity: 0, transform: 'scale(0.8)'  }),
                    sequence([
                        animate('500ms', style({ opacity: 1 })),
                        animate('200ms ease-in', style({ transform: 'scale(1)' }))
                    ])
                ])
            ])
        ])

// Eight: Stagger
export const stgger = trigger('fadeInGrow', [
        transition(':enter', [
            query(':enter', [
                style({ opacity: 0 }),
                stagger('50ms', [
	                animate('500ms', style({ opacity: 1 }))
                ])
            ])
        ])
    ])

// Nine: keyframe
/* angular animations */
trigger('fadeSlideGrowKeyframe', [
    transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
        animate(
            '500ms',
            keyframes([
                style({ opacity: 1, offset: 0.3 }),
                style({ transform: 'translateY(0)', offset: 0.6 }),
                style({ transform: 'scale(1)', offset: 1 }),
            ])
        ),
    ])
])


// Ten: Reuse
export const Slide = animation([
    style({ transform: 'translate({{x}}px, {{y}}px)' }),
    animate('{{duration}}s', style({ transform: 'translate(0,0)' })),
]);

// use the animation from within the trigger
trigger('slide', [
    transition(
        ':enter',
        useAnimation(Slide, {
            params: {
                x: 0,
                y: 50,
                duration: 0.3,
            },
        })
    ),
])