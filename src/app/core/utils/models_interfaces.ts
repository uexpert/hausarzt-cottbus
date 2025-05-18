export class TeamEmployee {
    constructor(
        public url: string = '',
        public name: string = ''
    ) { }
}

export class ImagesCarouselObject {
    constructor(
        public id: number = 0,
        public url: string = '',
        public alt: string = ''
    ) { }
}

export const sommarUrlaub = [
    '<div class="text-primary x-font-bold font-sm-18">Praxisurlaub vom 26. Juli bis 15. August 2025</div>',
    'Liebe Patientinnen und Patienten,',
    'bitte beachten Sie, dass unsere Praxis vom <b>26.07.2025</b> bis einschließlich <b>15.08.2025</b> aufgrund unseres Sommerurlaubs geschlossen bleibt.',
    'In dieser Zeit übernehmen folgende Praxen freundlicherweise die ärztliche Vertretung:',
    '<b>Vertretungspraxen:</b>',
    '<ul class="dot-list"><li><b>Praxis Dr. med. Anna Müller</b><br/>Musterstraße 12, 12345 Musterstadt<br>Tel.: 01234 / 567890</li><li><b>Praxisgemeinschaft Dres. Schneider &amp; Becker</b><br/>Beispielweg 34, 12345 Musterstadt<br/>Tel.: 01234 / 987654</li></ul>',
    'Bitte melden Sie sich vorab telefonisch bei der jeweiligen Vertretungspraxis an.',
    'In dringenden Fällen außerhalb der Sprechzeiten wenden Sie sich bitte an den <b>ärztlichen Bereitschaftsdienst unter der Telefonnummer 116 117</b> oder im Notfall an den <b>Rettungsdienst unter 112</b>.',
    'Ab <b>Montag, den 18.08.2025</b> sind wir wieder wie gewohnt für Sie da.',
    'Vielen Dank für Ihr Verständnis - wir wünschen Ihnen einen gesunden Sommer!',
    'Dr. Gabriel Chosnis, Dr. Katharina Chosnis und Praxisteam',
];

// | Type           | Example Syntax                     |          |
// | -------------- | ---------------------------------- | -------- |
// | Constant       | `export const MY_LIST = [...]`     |          |
// | Variable       | `export let counter = 0`           |          |
// | Function       | `export function doSomething() {}` |          |
// | Class          | `export class MyClass {}`          |          |
// | Interface      | `export interface User {}`         |          |
// | Type Alias     | \`export type ID = number          | string\` |
// | Enum           | `export enum Role { Admin, User }` |          |
// | Default Export | `export default function() {}`     |          |
// | Re-export      | `export * from './module'`         |          |
