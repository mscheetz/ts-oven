import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestService } from 'src/app/core/rest.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear().toString();
  showQRCode: boolean = false;
  donateType: string;
  address: string = "";
  symbol: string;

  constructor(private restSvc: RestService, private messageSvc: MessageService) { }

  ngOnInit(): void {
  }

  /**
   * Get an address
   * 
   * @param symbol address symbol
   */
  getAddress(symbol: string) {
    this.restSvc.address(symbol)
      .subscribe(res => {
        this.symbol = symbol.toLocaleUpperCase();
        const name = this.symbol === 'BTC' ? 'Bitcoin' : this.symbol === 'XMR' ? 'Monero' : 'Ethereum';
        this.donateType = `Donate with ${name}!`;
        this.showQRCode = true;
        this.address = res;
      });
  }

    /**
     * Copy address to the clipboard
     */
    copyAddress() {
      document.addEventListener('copy', (e: ClipboardEvent) => {
          e.clipboardData.setData('text/plain', (this.address));
          e.preventDefault();
          document.removeEventListener('copy', null);
      });
      document.execCommand('copy');

      let message = this.symbol + " address copied to clipboard";
      this.messageSvc.clear();
      this.messageSvc.add({ severity: 'success', detail: message });

      this.showQRCode = false;
    }
}
