import type { Office } from '../types';

const offices: Office[] = [
  {
    id: 1,
    name: "Oficina Central",
    online: true,
    lines: [
      {
        waiting: 3,
        elapsed: 513
      },
      {
        waiting: 6,
        elapsed: 201
      },
      {
        waiting: 1,
        elapsed: 334
      }
    ]
  },
  {
    id: 2,
    name: "Sucursal Norte",
    online: false,
    lines: [
      {
        waiting: 3,
        elapsed: 457
      },
      {
        waiting: 6,
        elapsed: 239
      }
    ]
  },
  {
    id: 3,
    name: "Sucursal Sur",
    online: true,
    lines: [
      {
        waiting: 2,
        elapsed: 248
      }
    ]
  },
  {
    id: 4,
    name: "Oficina Este",
    online: false,
    lines: [
      {
        waiting: 8,
        elapsed: 543
      },
      {
        waiting: 2,
        elapsed: 456
      }
    ]
  },
  {
    id: 5,
    name: "Oficina Oeste",
    online: true,
    lines: [
      {
        waiting: 5,
        elapsed: 265
      },
      {
        waiting: 6,
        elapsed: 484
      }
    ]
  },
  {
    id: 6,
    name: "Sucursal Metropolitana",
    online: false,
    lines: [
      {
        waiting: 10,
        elapsed: 313
      },
      {
        waiting: 5,
        elapsed: 328
      }
    ]
  },
  {
    id: 7,
    name: "Oficina Regional",
    online: true,
    lines: [
      {
        waiting: 3,
        elapsed: 522
      },
      {
        waiting: 2,
        elapsed: 512
      },
      {
        waiting: 2,
        elapsed: 591
      }
    ]
  },
  {
    id: 8,
    name: "Centro de Atención",
    online: true,
    lines: [
      {
        waiting: 1,
        elapsed: 462
      },
      {
        waiting: 6,
        elapsed: 386
      }
    ]
  },
  {
    id: 9,
    name: "Punto de Servicio",
    online: true,
    lines: [
      {
        waiting: 7,
        elapsed: 359
      },
      {
        waiting: 4,
        elapsed: 507
      },
      {
        waiting: 3,
        elapsed: 502
      }
    ]
  },
  {
    id: 10,
    name: "Oficina de Innovación",
    online: true,
    lines: [
      {
        waiting: 7,
        elapsed: 535
      },
      {
        waiting: 3,
        elapsed: 475
      }
    ]
  },
  {
    id: 11,
    name: "Centro Tecnológico",
    online: false,
    lines: [
      {
        waiting: 2,
        elapsed: 255
      },
      {
        waiting: 10,
        elapsed: 363
      },
      {
        waiting: 9,
        elapsed: 295
      }
    ]
  },
  {
    id: 12,
    name: "Sucursal Urbana",
    online: true,
    lines: [
      {
        waiting: 10,
        elapsed: 488
      },
      {
        waiting: 8,
        elapsed: 550
      },
      {
        waiting: 5,
        elapsed: 356
      }
    ]
  }
]

export default offices;