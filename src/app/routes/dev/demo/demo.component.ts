import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
  <nz-table [nzData]="list" [nzShowPagination]="false">
    <thead>
      <tr>
        <th>序号</th>
        <th>服务器 ID</th>
        <th nzWidth="350px">服务调用次数</th>
        <th nzWidth="350px">数据有负值</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let i of list; let idx=index">
        <td>{{idx + 1}}</td>
        <td>{{idx * 10000}}</td>
        <td>
          <g2-single-bar height="24" [value]="i.value"></g2-single-bar>
        </td>
        <td>
          <g2-single-bar height="60" [value]="i.other" min="-100" line></g2-single-bar>
        </td>
      </tr>
    </tbody>
  </nz-table>
  `,
  styles: [`
  :host .ant-table-tbody > tr > td {
    padding: 0 16px;
  }
  `],
})
export class DemoComponent {
  list = new Array(5).fill({}).map((i, idx) => ({
    id: Math.floor(Math.random() * 10000),
    value: Math.floor(Math.random() * 100),
    other: Math.floor(Math.random() * 100) > 50 ? Math.floor(Math.random() * 100) : -Math.floor(Math.random() * 100),
  }));
}
