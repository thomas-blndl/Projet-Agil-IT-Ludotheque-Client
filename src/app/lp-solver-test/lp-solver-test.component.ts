import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

declare var solver: any;

@Component({
  selector: 'app-lp-solver-test',
  templateUrl: './lp-solver-test.component.html',
  styleUrls: ['./lp-solver-test.component.css']
})
export class LpSolverTestComponent implements OnInit {

  readonly probleme = {
    variables: {
      s1: {
        p1: 5,
        p2: 8,
        p3: 5,
        benefice: 4.2
      },
      s2: {
        p1: 7,
        p2: 3,
        p3: 8,
        benefice: 5.1
      }
    },
    ints: {s1: 1, s2: 1},
    binaries: {},
    constraints: {
      p1: {max: 200},
      p2: {max: 250},
      p3: {max: 220}
    },
    opType: 'max',
    optimize: 'benefice'
  };
  readonly sacAdoc = {
    variables: {
        o1: {
          poids: 12,
          benefice: 10,
        },
        o2: {
          poids: 11,
          benefice: 10,
        },
        o3: {
          poids: 7,
          benefice: 15,
        },
        o4: {
          poids: 25,
          benefice: 32,
        },
        o5: {
          poids: 10,
          benefice: 7,
        },
        o6: {
          poids: 5,
          benefice: 7,
        },
    },
    ints: {},
    binaries: {o1: 1, o2: 1, o3: 1, o4: 1, o5: 1, o6: 1},
    constraints: {
      poids: {max: 40},
    },
    opType: 'max',
    optimize: 'benefice'
  };

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  resolutionSacADos(): void {
    console.log(this.sacAdoc);
    const resultat = solver.Solve(this.sacAdoc);
    console.log(resultat);
    const nbO1 = resultat.o1;
    const nbO2 = resultat.o2;
    const nbO3 = resultat.o3;
    const nbO4 = resultat.o4;
    const nbO5 = resultat.o5;
    const nbO6 = resultat.o6;

    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${`Solution : Objet 1 :  ${nbO1 ? nbO1 : '0'},
       Objet 2 : ${nbO2 ? nbO1 : '0'},
       Objet 2 : ${nbO2 ? nbO2 : '0'},
       Objet 3 : ${nbO3 ? nbO3 : '0'},
       Objet 4 : ${nbO4 ? nbO4 : '0'},
       Objet 5 : ${nbO5 ? nbO5 : '0'},
       Objet 6 : ${nbO6 ? nbO6 : '0'},
       Bénéfice : ${resultat.result}`}`,

    });
  }

  resolutionProbleme(): void {
    const resultat = solver.Solve(this.probleme);
    console.log(resultat);
    const nbS1 = resultat.s1;
    const nbS2 = resultat.s2;
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Sachets S1 :  ${nbS1}, Sachets S2 : ${nbS2}, Bénéfice : ${resultat.result}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });
  }

}
