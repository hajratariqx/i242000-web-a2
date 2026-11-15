// Run with: node --test
// Tests the SAME functions the React app uses (src/utils/businessRules.js).
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateDeliveryFee, checkAddToBag, resolveCartLine, calculateTotals,
  DELIVERY_FEE, FREE_DELIVERY_THRESHOLD,
} from '../src/utils/businessRules.js'
import { isValidPakistaniPhone, validateCheckout } from '../src/utils/validation.js'

const shirt = { id: 'T1', name: 'Test Shirt', price: 1000, originalPrice: null, stock: { S: 3, M: 0, L: 5 } }

describe('Rule 3: delivery fee', () => {
  it('charges Rs. 250 for an ordinary order below the threshold', () => {
    assert.equal(calculateDeliveryFee(4000), DELIVERY_FEE)
  })
  it('charges Rs. 250 at Rs. 4,999 (one rupee below the limit)', () => {
    assert.equal(calculateDeliveryFee(4999), 250)
  })
  it('is free at exactly Rs. 5,000', () => {
    assert.equal(calculateDeliveryFee(FREE_DELIVERY_THRESHOLD), 0)
  })
  it('is free above the threshold', () => {
    assert.equal(calculateDeliveryFee(6000), 0)
  })
  it('charges nothing for an empty bag', () => {
    assert.equal(calculateDeliveryFee(0), 0)
  })
})

describe('Rule 1: stock limit', () => {
  it('allows a normal quantity', () => {
    assert.equal(checkAddToBag({ product: shirt, size: 'S', quantity: 2 }).ok, true)
  })
  it('allows exactly the stock (3 of 3)', () => {
    assert.equal(checkAddToBag({ product: shirt, size: 'S', quantity: 3 }).ok, true)
  })
  it('rejects one more than the stock (4 of 3)', () => {
    const result = checkAddToBag({ product: shirt, size: 'S', quantity: 4 })
    assert.equal(result.ok, false)
    assert.equal(result.code, 'over-stock')
  })
  it('counts what is already in the bag', () => {
    assert.equal(checkAddToBag({ product: shirt, size: 'S', quantity: 2, quantityInBag: 2 }).ok, false)
  })
  it('rejects a sold-out size (stock 0)', () => {
    assert.equal(checkAddToBag({ product: shirt, size: 'M', quantity: 1 }).code, 'sold-out')
  })
})

describe('Rule 2: sizes a product offers', () => {
  it('accepts an offered size', () => {
    assert.equal(checkAddToBag({ product: shirt, size: 'L', quantity: 1 }).ok, true)
  })
  it('rejects a size the product does not offer', () => {
    assert.equal(checkAddToBag({ product: shirt, size: 'XXL', quantity: 1 }).code, 'bad-size')
  })
  it('requires a size', () => {
    assert.equal(checkAddToBag({ product: shirt, size: '', quantity: 1 }).code, 'no-size')
  })
})

describe('Bag recovery when stock changes', () => {
  it('reduces a quantity that is now above stock', () => {
    const line = resolveCartLine({ productId: 'T1', size: 'S', quantity: 5 }, [shirt])
    assert.equal(line.status, 'reduced')
    assert.equal(line.quantity, 3)
  })
  it('removes a line whose size is now sold out', () => {
    assert.equal(resolveCartLine({ productId: 'T1', size: 'M', quantity: 1 }, [shirt]).status, 'removed')
  })
  it('removes a line whose product is gone', () => {
    assert.equal(resolveCartLine({ productId: 'NOPE', size: 'M', quantity: 1 }, [shirt]).status, 'removed')
  })
  it('totals use the corrected quantity and the delivery rule', () => {
    const lines = [resolveCartLine({ productId: 'T1', size: 'L', quantity: 5 }, [shirt])]
    const totals = calculateTotals(lines)
    assert.equal(totals.subtotal, 5000)
    assert.equal(totals.deliveryFee, 0)
    assert.equal(totals.total, 5000)
  })
})

describe('Checkout validation', () => {
  it('accepts common Pakistani mobile formats', () => {
    ;['03001234567', '0300 1234567', '+92 300 1234567', '923001234567'].forEach((n) =>
      assert.equal(isValidPakistaniPhone(n), true, n))
  })
  it('rejects bad phone numbers', () => {
    ;['123', '0211234567', '03001234'].forEach((n) => assert.equal(isValidPakistaniPhone(n), false, n))
  })
  it('reports only the fields that are wrong', () => {
    const errors = validateCheckout({
      fullName: 'Ayesha Khan', email: 'abc', phone: '03001234567',
      city: 'Lahore', address: 'House 12, Street 4, F-8, Islamabad', notes: '',
    })
    assert.deepEqual(Object.keys(errors), ['email'])
  })
})
