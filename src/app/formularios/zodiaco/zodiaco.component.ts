import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent implements OnInit {
  formulario: FormGroup;
  resultado: string | null = null;
  imagenSigno: string | null = null;

  private signosChinos: { [key: string]: string } = {
    "Rata": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462306516_871719675095709_160618844928295625_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9BfHx3bjL1sQ7kNvgHFHEfv&_nc_ht=scontent-mty2-1.xx&_nc_gid=A9g5LkwcZdrXSCkhfO2MbOZ&oh=00_AYC71-NEPZCLDqbjrx5mwOOSxgqXinPmxp85ZqxhNPEi_w&oe=670B90DA",
    "Buey": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462456775_871719915095685_3121575567006762404_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Fua92K1p3TUQ7kNvgE0w9Wh&_nc_ht=scontent-mty2-1.xx&_nc_gid=A6s-oXn4mA48_zA5ELcmrme&oh=00_AYDKmzphbGgmSwmCfoe32rWIsgjlDPYSMpGof9e3yJa_Zg&oe=670B94F3",
    "Tigre": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462322645_871719735095703_6298164935856332892_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=3HCPhQeTCeUQ7kNvgF8gUnF&_nc_ht=scontent-mty2-1.xx&_nc_gid=Afms5WHu6uEs46a3uiKm5-B&oh=00_AYDhqRxo9bl2q7aCrpgrRGqmgaybBsW5670IV_lNbp9mcg&oe=670B97BF",
    "Conejo": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462270877_871719965095680_1584950873325555206_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hwN7V3w4N7QQ7kNvgEabpTY&_nc_ht=scontent-mty2-1.xx&_nc_gid=AdCYeBSyXj0FqixH_SrqKHr&oh=00_AYC5vHkAXLStETXQn5jCC66tjEdB5eNa1Hym-7FOWNLMyg&oe=670B9BAE",
    "Dragón": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462306326_871720051762338_7513112199324776508_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=mYH8PaZs_rUQ7kNvgFS0GXi&_nc_ht=scontent-mty2-1.xx&_nc_gid=At7KN9eZ9aOL9qb4bFZ-9R3&oh=00_AYAH20sQS10_ki0nuyHdF2Qvmj47Znt0TEKeDxAMhO9RtQ&oe=670BB8F1",
    "Serpiente": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462370268_871719668429043_5521408602790887386_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=7FW79B0BOf0Q7kNvgHCcuuz&_nc_ht=scontent-mty2-1.xx&_nc_gid=AqsdM_YIUPnuHzPIQ8L6Hd9&oh=00_AYDREQ_OqEP2uBET3mYS_tu1-fjmtX7ioGDwLOA4AstBmQ&oe=670BB9AA",
    "Caballo": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462367416_871720021762341_6328460514365503129_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=5WTTBaYLbfkQ7kNvgE3dZ8D&_nc_ht=scontent-mty2-1.xx&_nc_gid=AHcgI05RJH-zD30TquM6WUU&oh=00_AYCW-tpqzJWnIaCGxoRthdpnYeZOeksJJIjn2xI8y5sBiQ&oe=670B9D81",
    "Cabra": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462233464_871719791762364_4765675070428071380_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=IzZATXwn1NEQ7kNvgG6aREr&_nc_ht=scontent-mty2-1.xx&_nc_gid=AKkwV9FKAFo00GFcdAtURdE&oh=00_AYAtb1coCq3nmAhIo8cR6A61CCcuY4ycWfXVKxRrfatyyA&oe=670BB7B9",
    "Mono": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/461518235_871719845095692_7930674476898365107_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9dzipXCc_6wQ7kNvgHpSUJA&_nc_ht=scontent-mty2-1.xx&_nc_gid=A21DOHcvT6OH-7kaP2nQatj&oh=00_AYD7GalSldoFsqGvUzcD63cimU9jAuprZAHbmpK2Eoui_Q&oe=670B914F",
    "Gallo": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462475037_871719955095681_6487767086739959577_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=n1QBrKNc7PUQ7kNvgGwyQOa&_nc_ht=scontent-mty2-1.xx&_nc_gid=A5z9sdXOY-SAVNYO1CYCYaI&oh=00_AYDEfdc5g7s1HU80IQuD1B-aRGRMHUUGz_merUyhsuCF7g&oe=670BBB7C",
    "Perro": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462225391_871719678429042_7081575492868284068_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Nc561ypdva0Q7kNvgHYuUDx&_nc_ht=scontent-mty2-1.xx&_nc_gid=AYC4jufNE5u133Zwjv-YUob&oh=00_AYA3ca4NmuWc1_XuIX5-QK8aQ0V0IwiQWpRVhetlzg5Akw&oe=670BC5F8",
    "Cerdo": "https://scontent-mty2-1.xx.fbcdn.net/v/t39.30808-6/462619886_871719781762365_3946257128595592012_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Rb1pCC48eyYQ7kNvgHfr7nR&_nc_ht=scontent-mty2-1.xx&_nc_gid=AtVVoHdSoYR8eZij7-ge7Sy&oh=00_AYANIzzZ3bEd1YwVK3B7UC_33K-sX7V_AiWe5OHE7EJKTA&oe=670B98D5"
  };

  private signosChinosArray: string[] = [
    "Rata", "Buey", "Tigre", "Conejo", "Dragón",
    "Serpiente", "Caballo", "Cabra", "Mono",
    "Gallo", "Perro", "Cerdo"
  ];

  constructor() {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      aPaterno: new FormControl('', Validators.required),
      aMaterno: new FormControl('', Validators.required),
      dia: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
      mes: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
      anio: new FormControl('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())])
    });
  }

  ngOnInit(): void {}

  calcularSigno(): void {
    if (this.formulario.valid) {
      const { nombre, aPaterno, aMaterno, dia, mes, anio } = this.formulario.value;
      const signo = this.obtenerSignoChino(anio);
      this.resultado = `Hola ${nombre} ${aPaterno} ${aMaterno}. Tu signo chino es: ${signo}. Fecha de nacimiento: ${dia}/${mes}/${anio}.`;
      this.imagenSigno = this.signosChinos[signo];
    }
  }

  private obtenerSignoChino(anio: number): string {
    const indice = (anio - 4) % 12; // Rata en 4
    return this.signosChinosArray[indice];
  }
}
