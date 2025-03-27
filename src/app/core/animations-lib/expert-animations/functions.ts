// // Five: Route
// prepareRoute(outlet: RouterOutlet) {
//     return (
//         outlet?.activatedRouteData &&
//         outlet.activatedRouteData['animation']
// 	);
// }
// // in Routes
// {
// 	path: 'home',
// 	component: HomeComponent,
// 	data: { animation: 'home' },
// },
// {
// 	path: 'post',
// 	component: PostComponent,
// 	data: { animation: 'post' },
// }


// // Six: Disable animation
// export class AppComponent {
// 	@HostBinding('@.disabled') private disabled = true;
// }