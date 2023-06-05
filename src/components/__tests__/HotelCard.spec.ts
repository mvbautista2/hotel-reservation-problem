import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HotelCard from '../HotelCard.vue'

describe('HotelCard', () => {
  it('renders properly', () => {
    const wrapper = mount(HotelCard)
    if (expect(wrapper.find('#type-costumer').exists())) {
      expect(wrapper.text()).toBe(
        'Tipo de cliente:Cliente RegularCliente recompensaFechas a reservar: + Lakewood ⭐⭐⭐Precio cliente regular Fin de Semana: $90Precio cliente regular Lunes a Viernes: $110Precio cliente recompensa Lunes a Viernes: $80Precio cliente recompensa Fines de Semana: $80Bridgewood⭐⭐⭐⭐Precio cliente regular Fin de Semana: $60Precio cliente regular Lunes a Viernes: $160Precio cliente recompensa Lunes a Viernes: $110Precio cliente recompensa Fines de Semana: $50Ridgewood⭐⭐⭐⭐Precio cliente regular Fin de Semana: $150Precio cliente regular Lunes a Viernes: $200Precio cliente recompensa Lunes a Viernes: $100Precio cliente recompensa Fines de Semana: $40'
      )
    }
  })
})
