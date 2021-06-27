<template>
  <div class="max-w-2xl mx-auto px-4 xl:px-0 mt-12 font-mono">
    <h1 class="text-4xl text-center font-medium">
      Coin profit/loss calculator
    </h1>

    <div class="my-16">
      <div class="form-group">
        <label for="investment" class="form-label"> Select coin: </label>
        <multi-select
          v-model="form.coin"
          :searchable="true"
          :options="priceOptions"
          placeholder="Click to select a crypto-currency"
        />
      </div>
    </div>

    <div class="grid grid-cols-3 gap-12">
      <div class="form-group">
        <label for="investment" class="form-label"> Investment </label>
        <input
          id="investment"
          v-model="form.investment"
          placeholder="Investment"
          class="input"
        />
      </div>

      <div class="form-group">
        <label for="initial-coin-price" class="form-label">
          Initial Coin Price
        </label>
        <input
          id="initial-coin-price"
          v-model="form.initialCoinPrice"
          placeholder="Initial Coin Price"
          class="input"
        />
      </div>

      <div class="form-group">
        <label for="selling-coin-price" class="form-label">
          Selling Coin Price
        </label>
        <input
          id="selling-coin-price"
          v-model="form.sellingCoinPrice"
          placeholder="Selling Coin Price"
          class="input"
        />
      </div>
    </div>

    <div class="mt-4">
      <h3>
        Total: <b>{{ total }}</b>
      </h3>
      <p></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MultiSelect from '@vueform/multiselect'
  import '@vueform/multiselect/themes/default.css'
  import { computed, onMounted, ref, watch } from 'vue'

  const form = ref<any>({
    coin: null,
    investment: 0,
    initialCoinPrice: 0,
    sellingCoinPrice: 0,
  })

  const priceOptions = ref<any>([])

  watch(
    () => form.value.coin,
    (value: any) => {
      form.value.initialCoinPrice = value
    }
  )

  const total = computed(() => {
    const { investment, initialCoinPrice, sellingCoinPrice } = form.value
    return (
      Number(sellingCoinPrice * investment) -
      Number(initialCoinPrice * investment)
    )
  })

  onMounted(async () => {
    const priceResponse = await fetch(`http://localhost:5001/v1/prices`).then(
      (res) => res.json()
    )
    priceOptions.value = Object.keys(priceResponse).map((k: any) => ({
      value: priceResponse[k],
      label: k,
    }))
  })
</script>
