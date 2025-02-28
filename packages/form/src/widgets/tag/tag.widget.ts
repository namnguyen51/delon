import { Component, ViewEncapsulation } from '@angular/core';

import { SFTagWidgetSchema } from './schema';
import { SFValue } from '../../interface';
import { SFSchemaEnum } from '../../schema';
import { getData } from '../../utils';
import { ControlUIWidget } from '../../widget';

@Component({
  selector: 'sf-tag',
  templateUrl: './tag.widget.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None
})
export class TagWidget extends ControlUIWidget<SFTagWidgetSchema> {
  data: SFSchemaEnum[] = [];

  reset(value: SFValue): void {
    getData(this.schema, this.ui, value).subscribe(list => {
      this.data = list;
      this.detectChanges();
    });
  }

  onChange(item: SFSchemaEnum): void {
    item.checked = !item.checked;
    this.updateValue();
    if (this.ui.checkedChange) {
      this.ui.checkedChange(item.checked);
    }
  }

  _close(e: MouseEvent): void {
    if (this.ui.onClose) this.ui.onClose(e);
  }

  private updateValue(): void {
    this.formProperty.setValue(
      this.data.filter(w => w.checked).map(i => i.value),
      false
    );
  }
}
