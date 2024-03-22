import { Component } from '@angular/core';
import {gsap} from 'gsap';
import { Database, object, ref, set } from '@angular/fire/database';
import { update } from 'firebase/database';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dormPrin:boolean=false;
  dormSec:boolean=false;
  bano:boolean=false;
  estudio:boolean=false;
  sala:boolean=false;
  comedor:boolean=false;
  cocina:boolean=false;
  constructor(private database:Database) {}
  
  async editar(id:any){
    const route = ref(this.database, 'Casa/' + id);
    if(id== "Bano"){
      await set(route, !this.bano);
    }else if(id== "Sala"){
      await set(route, !this.sala);
    }else if(id== "Cocina"){
      await set(route, !this.cocina);
    }else if(id== "Comedor"){
      await set(route, !this.comedor);
    }else if(id== "DormPrin"){
      await set(route, !this.dormPrin);
    }else if(id== "DormSec"){
      await set(route, !this.dormSec);
    }else if(id== "Estudio"){
      await set(route, !this.estudio);
    }
  }
    ngOnInit() {
      gsap.to(".card", {
        duration: 1,
        ease: " back.in( 1.7)",
        y: 250
      });
      gsap.to(".bano , .estudio , .dormPrin, .dormSec, .sala, .comedor, .cocina", {
        duration: 1,
        delay: 0.2,
        ease: " steps( 1.7)",
        y: 5
      });
      const route = ref(this.database,"Casa");
      object(route).subscribe(attributes => {
        attributes.snapshot.forEach(Element=>{
          if(Element.key == "Bano"){
            this.bano = Element.val();
          }else if(Element.key == "Sala"){
            this.sala= Element.val();
          }else if(Element.key == "Cocina"){
            this.cocina = Element.val();
          }else if(Element.key == "Comedor"){
            this.comedor = Element.val();
          }else if(Element.key == "DormPrin"){
            this.dormPrin = Element.val();
          }else if(Element.key == "DormSec"){
            this.dormSec = Element.val();
          }else if(Element.key == "Estudio"){
            this.estudio = Element.val();
          }
          
        });
      });
    }
}