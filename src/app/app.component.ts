import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

interface item {
  image: string;
  title: string;
  text: string;
  price: number;
  basePrice: number;
  grams: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  })

  public currency = '$';
  public language: string = 'English';

  public localesList = [
      {code:'en-US', label: 'English'},
      {code:'ru', label: 'Русский'},
  ]

  public productsData: any =[]

  public productsDataLocal: item [] = [
    {
      image: "1.png",
      title: $localize`Burger cheddar & bacon`,
      text:  $localize`Crispy beef cutlet, bun, tomato, Cheddar cheese, brisket,
      red onion, iceberg lettuce, mayonnaise, ketchup, cheese sauce`,
      price: 8,
      basePrice: 8,
      grams: 360
    },
    {
      image: "2.png",
      title:  $localize`BBQ with chicken`,
      text:  $localize`'Sesame brioche bun, chicken cutlet, cheddar cheese, tomato, pickled cucumber,
      pickled onion, BBQ sauce.`,
      price: 9,
      basePrice: 9,
      grams: 390
    },
    {
      image: "3.png",
      title:  $localize`Double beef burger`,
      text:  $localize`Two beef patties, cheddar cheese, romaine lettuce, pickled cucumbers, fresh tomato,
      bacon, red onion, burger sauce, mustard.`,
      price: 10,
      basePrice: 10,
      grams: 420
    },
    {
      image: "4.png",
      title: $localize`Bavarian burger`,
      text: $localize`Burger bun, beef patty, red onion, cheese, hunting sausage, barbecue sauce, cheese sauce, iceberg lettuce.`,
      price: 7,
      basePrice: 7,
      grams: 320
    },
    {
      image: "5.png",
      title: $localize`Bacon cheeseburger`,
      text: $localize`Burger bun, beef cutlet, brisket, tomato, pickled cucumber, cheese, cheese sauce, ketchup, herbs.`,
      price: 8,
      basePrice: 8,
      grams: 360
    },
    {
      image: "6.png",
      title: $localize`Indiana burger`,
      text: $localize`Burger bun, chicken cutlet, brisket, egg, pickled cucumber, crispy onion, ketchup, cheese sauce, mustard, greens.`,
      price: 10,
      basePrice: 10,
      grams: 410
    },
    {
      image: "7.png",
      title: $localize`Veggie burger`,
      text: $localize`Burger bun, veggie patty, red onion, cheese, fresh tomato, barbecue sauce, cheese sauce, iceberg lettuce.`,
      price: 8,
      basePrice: 8,
      grams: 290
    },
    {
      image: "8.png",
      title: $localize`Weepy Joe`,
      text: $localize`Burger bun, beef patty, brisket, tomato, pickled cucumber, red onion, cheese, jalapeno pepper, ketchup, herbs.`,
      price: 7,
      basePrice: 7,
      grams: 360
    },
    {
      image: "9.png",
      title: $localize`Double cheeseburger`,
      text: $localize`Burger bun, two beef patties, double cheddar cheese, crispy onion, ketchup, cheese sauce, mustard, herbs.`,
      price: 11,
      basePrice: 11,
      grams: 420
    },
    {
      image: "10.png",
      title: $localize`Fresh-burger`,
      text: $localize`Burger bun, beef patty, bacon, cheddar cheese, egg, salami, barbecue sauce, cheese sauce, iceberg lettuce, fresh tomato.`,
      price: 9,
      basePrice: 9,
      grams: 310
    },
    {
      image: "11.png",
      title: $localize`Zucchini burger`,
      text: $localize`Burger bun, veggie chickpea patty, grilled zucchini, tomato, pickled cucumber, cheese, mustard sauce, ketchup, herbs.`,
      price: 8,
      basePrice: 8,
      grams: 330
    },
    {
      image: "12.png",
      title: $localize`Double Cheddar Burger`,
      text: $localize`Burger bun, beef patty, brisket, red onion, pickled cucumber, tomato, ketchup, double cheddar cheese, mustard, herbs.`,
      price: 9,
      basePrice: 9,
      grams: 370
    },
    {
      image: "13.png",
      title: $localize`Black White Light`,
      text: $localize`Black and white burger bun, beef patty, Parmesan cheese, hot sauce.`,
      price: 12,
      basePrice: 12,
      grams: 290
    },
    {
      image: "14.png",
      title: $localize`Black White Bacon`,
      text: $localize`Black and white burger bun, beef patty, bacon, Cheddar cheese, iceberg lettuce, sauce, cucumber.`,
      price: 13,
      basePrice: 13,
      grams: 310
    },
    {
      image: "15.png",
      title: $localize`Black White Max`,
      text: $localize`Black and white burger bun, beef patty, Cheddar cheese, iceberg lettuce, egg, black sauce.`,
      price: 16,
      basePrice: 16,
      grams: 330
    },
    {
      image: "16.png",
      title: $localize`Black Star Light`,
      text: $localize`Black burger bun, chicken cutlet, egg, iceberg lettuce, fresh tomato, cucumber, Black sauce.`,
      price: 13,
      basePrice: 13,
      grams: 290
    },
    {
      image: "17.png",
      title: $localize`Black Star`,
      text: $localize`Black burger bun, beef patty, Cheddar cheese, iceberg lettuce, fresh tomato, cucumber.`,
      price: 14,
      basePrice: 14,
      grams: 310
    },
    {
      image: "18.png",
      title: $localize`Black Star Max`,
      text: $localize`Black burger bun, beef cutlet, Bacon, Onion, Cheddar cheese, iceberg lettuce, fresh tomato, ketchup.`,
      price: 15,
      basePrice: 15,
      grams: 330
    },
  ]

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit () {
    this.appService.getOrder().subscribe(data => this.productsData = data)
  }

  public scrollTo(target: HTMLElement, burger?: item) {
    target.scrollIntoView({behavior: "smooth"});
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  }

  public confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message)
              this.form.reset()
            },
            error: (response) => {
              alert(response.error.message)
            }
          }
        )
    }
  }

  public changeLanguage () {
    let newLanguage = 'English'
    let code = 'en-US';

      if (this.language === 'English') {
        newLanguage = 'Русский'
          code = 'ru'
      } else if (this.language === 'Русский'){
        newLanguage = 'English'
          code = 'en-US'

      }
      this.language = newLanguage
      console.log(this.language, code)
      return code
  }

  public changeCurrency() {

    let newCurrency = '$';
    let coefficient = 1;

    if (this.currency === '$') {
      newCurrency = 'PLN'
      coefficient = 4.1
    } else if (this.currency === 'PLN') {
      newCurrency = 'BYN'
      coefficient = 2.52
    } else if (this.currency === 'BYN') {
      newCurrency = '€';
      coefficient = 0.9;
    } else if (this.currency === '€') {
      newCurrency = '¥';
      coefficient = 6.9;
    }
    this.currency = newCurrency;

    this.productsDataLocal.forEach((item: item) => {
      item.price = +(item.basePrice * coefficient).toFixed(1)
    })
  }
}
