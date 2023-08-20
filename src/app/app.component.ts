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

  public productsData: any =[]

  // productsData = [
  //   {
  //     image: "1.png",
  //     title: 'Burger cheddar & bacon',
  //     text: 'Crispy beef cutlet, bun, tomato, Cheddar cheese, brisket, red onion, iceberg lettuce, mayonnaise, ketchup, cheese sauce',
  //     price: 8,
  //     basePrice: 8,
  //     grams: 360
  //   },
  //   {
  //     image: "2.png",
  //     title: 'BBQ with chicken',
  //     text: 'Sesame brioche bun, chicken cutlet, cheddar cheese, tomato, pickled cucumber, pickled onion, BBQ sauce.',
  //     price: 9,
  //     basePrice: 9,
  //     grams: 390
  //   },
  //   {
  //     image: "3.png",
  //     title: 'Double beef burger',
  //     text: 'Two beef patties, cheddar cheese, romaine lettuce, pickled cucumbers, fresh tomato, bacon, red onion, burger sauce, mustard.',
  //     price: 10,
  //     basePrice: 10,
  //     grams: 420
  //   },
  //   {
  //     image: "4.png",
  //     title: 'Bavarian burger',
  //     text: 'Burger bun, beef patty, red onion, cheese, hunting sausage, barbecue sauce, cheese sauce, iceberg lettuce.',
  //     price: 7,
  //     basePrice: 7,
  //     grams: 320
  //   },
  //   {
  //     image: "5.png",
  //     title: 'Bacon cheeseburger',
  //     text: 'Burger bun, beef cutlet, brisket, tomato, pickled cucumber, cheese, cheese sauce, ketchup, herbs.',
  //     price: 8,
  //     basePrice: 8,
  //     grams: 360
  //   },
  //   {
  //     image: "6.png",
  //     title: 'Indiana burger',
  //     text: 'Burger bun, chicken cutlet, brisket, egg, pickled cucumber, crispy onion, ketchup, cheese sauce, mustard, greens.',
  //     price: 10,
  //     basePrice: 10,
  //     grams: 410
  //   },
  //   {
  //     image: "7.png",
  //     title: 'Veggie burger',
  //     text: 'Burger bun, veggie patty, red onion, cheese, fresh tomato, barbecue sauce, cheese sauce, iceberg lettuce.',
  //     price: 8,
  //     basePrice: 8,
  //     grams: 290
  //   },
  //   {
  //     image: "8.png",
  //     title: 'Weepy Joe',
  //     text: 'Burger bun, beef patty, brisket, tomato, pickled cucumber, red onion, cheese, jalapeno pepper, ketchup, herbs.',
  //     price: 7,
  //     basePrice: 7,
  //     grams: 360
  //   },
  //   {
  //     image: "9.png",
  //     title: 'Double cheeseburger',
  //     text: 'Burger bun, two beef patties, double cheddar cheese, crispy onion, ketchup, cheese sauce, mustard, herbs.',
  //     price: 11,
  //     basePrice: 11,
  //     grams: 420
  //   },
  //   {
  //     image: "10.png",
  //     title: 'Fresh-burger',
  //     text: 'Burger bun, beef patty, bacon, cheddar cheese, egg, salami, barbecue sauce, cheese sauce, iceberg lettuce, fresh tomato.',
  //     price: 9,
  //     basePrice: 9,
  //     grams: 310
  //   },
  //   {
  //     image: "11.png",
  //     title: 'Zucchini burger',
  //     text: 'Burger bun, veggie chickpea patty, grilled zucchini, tomato, pickled cucumber, cheese, mustard sauce, ketchup, herbs.',
  //     price: 8,
  //     basePrice: 8,
  //     grams: 330
  //   }, {
  //     image: "12.png",
  //     title: 'Double Cheddar Burger',
  //     text: 'Burger bun, beef patty, brisket, red onion, pickled cucumber, tomato, ketchup, double cheddar cheese, mustard, herbs.\n',
  //     price: 9,
  //     basePrice: 9,
  //     grams: 370
  //   },
  // ]

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

    this.productsData.forEach((item: item) => {
      item.price = +(item.basePrice * coefficient).toFixed(1)
    })
  }
}
