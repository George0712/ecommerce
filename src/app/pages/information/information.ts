import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

interface InfoContent {
  title: string;
  lastUpdated: string;
  sections: { heading?: string; body: string }[];
}

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './information.html',
  styleUrl: './information.css'
})
export class Information implements OnInit {
  slug = signal<string>('');
  content = signal<InfoContent | null>(null);

  // Content dictionary mapped by route slug
  private contentData: Record<string, InfoContent> = {
    'preguntas-frecuentes': {
      title: 'Preguntas Frecuentes',
      lastUpdated: '01 de Abril, 2026',
      sections: [
        {
          heading: '¿Cuáles son los métodos de pago aceptados?',
          body: 'Aceptamos todas las tarjetas de crédito y débito principales (Visa, MasterCard, American Express), así como pagos mediante PSE, Wompi, y transferencias bancarias directas.'
        },
        {
          heading: '¿Cuánto tiempo tarda en llegar mi pedido?',
          body: 'El tiempo de entrega estándar es de 2 a 5 días hábiles para ciudades principales y de 5 a 8 días hábiles para el resto del país. Recibirás un número de guía una vez tu pedido sea despachado.'
        },
        {
          heading: '¿Puedo cancelar o modificar mi pedido?',
          body: 'Puedes solicitar cambios o cancelaciones dentro de las primeras 12 horas posteriores a tu compra comunicándote con nuestro equipo de soporte. Una vez el pedido ha sido procesado y enviado, no será posible cancelarlo.'
        }
      ]
    },
    'tiempos-de-envio': {
      title: 'Tiempos de Envío',
      lastUpdated: '15 de Marzo, 2026',
      sections: [
        {
          heading: 'Cobertura Nacional',
          body: 'Realizamos envíos a toda Colombia asegurando que tus productos deportivos lleguen directamente a la puerta de tu casa mediante las transportadoras más confiables del país.'
        },
        {
          heading: 'Tiempos Estimados',
          body: 'Ciudades Principales (Bogotá, Medellín, Cali, Barranquilla): 2 a 3 días hábiles.\nCiudades Secundarias: 3 a 5 días hábiles.\nMunicipios Remotos: 5 a 8 días hábiles.'
        },
        {
          heading: 'Rastreo de Pedidos',
          body: 'Tan pronto tu paquete salga de nuestra bodega, te enviaremos un correo electrónico con el número de seguimiento para que puedas monitorearlo en todo momento.'
        }
      ]
    },
    'devoluciones': {
      title: 'Devoluciones y Cambios',
      lastUpdated: '10 de Febrero, 2026',
      sections: [
        {
          heading: 'Condiciones de Devolución',
          body: 'Tienes hasta 30 días calendario desde la fecha en que recibes tu pedido para solicitar un cambio o devolución. El artículo debe estar sin uso, en las mismas condiciones en las que lo recibiste y en su empaque original.'
        },
        {
          heading: 'Excepciones',
          body: 'Por políticas de higiene, ropa interior deportiva, calcetines y ciertos accesorios no tienen cambio a menos que presenten defectos de fábrica evidentes.'
        },
        {
          heading: 'Proceso de Cambio',
          body: 'Para iniciar el proceso, contáctanos indicando tu número de pedido y el motivo de la devolución. Nuestro equipo te guiará con los pasos para hacernos llegar el producto.'
        }
      ]
    },
    'guia-de-tallas': {
      title: 'Guía de Tallas',
      lastUpdated: '05 de Enero, 2026',
      sections: [
        {
          heading: 'Cómo Tomar tus Medidas',
          body: 'Utiliza una cinta métrica flexible. Mide tu pecho bajo los brazos alrededor de la parte más ancha; para tu cintura mide alrededor de tu cintura natural; para la cadera, mide alrededor de la parte más ancha de la cadera.'
        },
        {
          heading: 'Calzado Deportivo',
          body: 'Te recomendamos siempre medir la longitud de tu pie en centímetros. Coloca el talón contra la pared y mide desde la pared hasta la punta de tu dedo más largo. Compara los centímetros con nuestras tablas de calzado.'
        }
      ]
    },
    'terminos-y-condiciones': {
      title: 'Términos y Condiciones',
      lastUpdated: '12 de Abril, 2026',
      sections: [
        {
          body: 'Bienvenido a SprintCO. Al acceder y usar este sitio web, aceptas cumplir con los siguientes términos y condiciones de uso. Nuestro contenido y productos están dirigidos exclusivamente a clientes y no pueden ser usados con fines comerciales no autorizados.'
        },
        {
          heading: 'Precios e Inventario',
          body: 'Los precios y la disponibilidad de los productos están sujetos a cambios sin previo aviso. Hacemos nuestro mejor esfuerzo por mantener la información actualizada, pero en caso de errores en precios, nos reservamos el derecho de cancelar pedidos correspondientes.'
        }
      ]
    },
    'politica-privacidad': {
      title: 'Política de Privacidad',
      lastUpdated: '20 de Marzo, 2026',
      sections: [
        {
          heading: 'Manejo de Datos Personales',
          body: 'En SprintCO garantizamos la máxima seguridad para tus datos personales. La información de facturación y envío es utilizada única y exclusivamente para procesar tus compras y brindarte una mejor experiencia, de acuerdo a la Ley de Protección de Datos Personales de Colombia.'
        },
        {
          heading: 'Comunicaciones',
          body: 'Al proporcionarnos tu correo electrónico, consientes recibir notificaciones sobre el estado de tu pedido. Los correos promocionales son opcionales y puedes cancelar tu suscripción en cualquier momento.'
        }
      ]
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.slug.set(slug);
        const data = this.contentData[slug];
        if (data) {
          this.content.set(data);
        } else {
          // Fallback content if route doesn't match
          this.content.set({
            title: 'Información No Encontrada',
            lastUpdated: '',
            sections: [
              { body: 'Lo sentimos, la página que estás buscando no existe o ha sido movida.' }
            ]
          });
        }
        window.scrollTo(0, 0);
      }
    });
  }
}
