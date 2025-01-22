import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, forwardRef, inject, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { APPEND_KEY, ARROW_LEFT, ARROW_RIGHT, BACKSPACE, BACKSPACE_STRING, CONTROL_NAME, DELETE, DELETE_STRING, NUMPAD_0, NUMPAD_9, PASSWORD, SPACE, TEL, TEXT } from './otp.interface';

@Component({
  selector: 'arc-otp-input',
  standalone: true,
  providers: [
      {
        provide: NG_VALUE_ACCESSOR
        , useExisting: forwardRef(() => OtpComponent)
        , multi: true
      }
    ],
    imports: [
      CommonModule
      , ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit ,AfterViewInit ,ControlValueAccessor{
  @Input() length!: number;
  @Input() isPasswordInput!: boolean;
  @Input() inputStyles?: {[key: string]: any};
  @Input() containerStyles?: {[key: string]: any};
  @Input() allowKeyCodes?: string[];
  @Input() allowNumbersOnly?: boolean;
  @Input() disableAutoFocus?: boolean;
  @Input() placeholder?: string;
  @Output() onChange = new EventEmitter<string>();
  onChangeCb?:(value: string) => void;
  onTouchedCb?:() => void;
  value = '';
  isDisabled = false;
  form = new FormGroup({});
  controls: FormControl[] = new Array(this.length);
  type: typeof PASSWORD | typeof TEL | typeof TEXT = TEXT;
  document = inject(DOCUMENT);
  ngOnInit(): void {
    for (let index = 0; index < this.length; index++) {
      this.form.addControl(this.getControlName(index), new FormControl());
    }
    this.type = this.isPasswordInput
      ? PASSWORD
      : this.allowNumbersOnly
      ? TEL
      : TEXT;
  }
  ngAfterViewInit(): void {
    if (!this.disableAutoFocus) {
      const containerItem = this.document.getElementById(`otp_code`);
      if (containerItem) {
        containerItem.addEventListener('paste', (evt) => this.handlePaste(evt));
        const ele: any = containerItem.getElementsByClassName('otp-input')[0];
        if (ele && ele.focus) {
          ele.focus();
        }
      }
    }
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  private getControlName = (index: number) => `${CONTROL_NAME}${index}`;
  private appendKey = (id: string) => `${id}${APPEND_KEY}`;

  handlePaste(e: ClipboardEvent) {
    // Get pasted data via clipboard API
    let clipboardData = e.clipboardData || window['clipboardData' as any];
    var pastedData = "";
    if(clipboardData instanceof DataTransfer){
      pastedData=clipboardData.getData('Text');
    }
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData) {
      return;
    }
    this.setValue(pastedData);
  }

  ifLeftArrow(event: any) {
    return this.ifKeyCode(event, ARROW_LEFT);
  }

  ifRightArrow(event: any) {
    return this.ifKeyCode(event, ARROW_RIGHT);
  }

  ifBackspaceOrDelete(event: KeyboardEvent) {
    return (
      event.key === BACKSPACE_STRING ||
      event.key === DELETE_STRING ||
      this.ifKeyCode(event, BACKSPACE) ||
      this.ifKeyCode(event, DELETE)
    );
  }

  ifKeyCode(event: KeyboardEvent, targetCode: number) {
    const key = event.keyCode || event.charCode;
    return key == targetCode ? true : false;
  }

  onKeyDown($event: KeyboardEvent) {
    var isSpace = this.ifKeyCode($event, SPACE);
    if (isSpace) {
      return false;
    }
    return true;
  }

  onKeyUp($event: any, inputIdx: number) {
    const nextInputId = this.appendKey(`otp_${inputIdx + 1}`);
    const prevInputId = this.appendKey(`otp_${inputIdx - 1}`);
    if (this.ifRightArrow($event)) {
      this.setSelected(nextInputId);
      return;
    }
    if (this.ifLeftArrow($event)) {
      this.setSelected(prevInputId);
      return;
    }
    const isBackspace = this.ifBackspaceOrDelete($event);
    if (isBackspace && !$event.target.value) {
      this.setSelected(prevInputId);
      this.rebuildValue();
      return;
    }
    if (!$event.target.value) {
      return;
    }
    if (this.ifValidEntry($event)) {
      this.setSelected(nextInputId);
    }
    this.rebuildValue();
  }

  setSelected(eleId: any) {
    this.focusTo(eleId);
    const ele = this.document.getElementById(eleId) as HTMLInputElement | null;
    if (ele && ele.setSelectionRange) {
      setTimeout(() => {
        ele.setSelectionRange(0, 1);
      }, 0);
    }
  }

  ifValidEntry(event: any) {
    const inp = String.fromCharCode(event.keyCode),
      isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      allowKeyCodes = this.allowKeyCodes;
    return (
      isMobile ||
      /[a-zA-Z0-9-_]/.test(inp) ||
      (allowKeyCodes && allowKeyCodes.includes(event.keyCode)) ||
      (event.keyCode >= NUMPAD_0 && event.keyCode <= NUMPAD_9)
    );
  }

  focusTo(eleId: string) {
    const ele = this.document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }

  andlePaste(e: any) {
    // Get pasted data via clipboard API
    let clipboardData = e.clipboardData || window['clipboardData' as any];
    if (clipboardData) {
      var pastedData = clipboardData.getData('Text');
    }
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();
    if (!pastedData) {
      return;
    }
    this.setValue(pastedData);
  }

  setValue(value: any) {
    if (this.allowNumbersOnly && isNaN(value)) {
      return;
    }
    this.form.reset();
    if (!value) {
      this.rebuildValue();
      return;
    }
    value = value.toString().replace(/\s/g, ''); // remove whitespace
    Array.from(value).forEach((c, idx) => {
      if (this.form.get(this.getControlName(idx))) {
        this.form.get(this.getControlName(idx))?.setValue(c);
      }
    });
    if (!this.disableAutoFocus) {
      const containerItem = this.document.getElementById(`otp_code`);
      var indexOfElementToFocus =
        value.length < this.length
          ? value.length
          : this.length - 1;
      let ele: any =
        containerItem?.getElementsByClassName('otp-input')[
          indexOfElementToFocus
        ];
      if (ele && ele.focus) {
        ele.focus();
      }
    }
    this.rebuildValue();
  }

  rebuildValue() {
    let val = '';
    this.keysPipe(this.form.controls).forEach((k) => {
      if (this.form.get(k)?.value) {
        val += this.form.get(k)?.value;
      }
    });
    this.onChange.emit(val);
    this.onChangeCb?.(val);
  }

  private keysPipe(value: any): string[] {
    return Object.keys(value);
  }
}
