<script setup>
  import AsidePanel from './base/AsidePanel.vue'  
</script>

<template>
  <AsidePanel />

  <section id="home" aria-label="Список приборов" class="w-3/4 py-6 px-4">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left">
        <caption class="mb-4">
          Список приборов: с 0 по 0 из 0
        </caption>

        <thead>
          <tr>
            <th scope="col" class="pe-3 py-2 align-bottom">
              <div class="flex flex-col gap-2">
                <input type="number" name="Number" class="font-normal rounded border-2 p-1" min="0" placeholder="Номер">
                <p>
                  Серийный №
                </p>
              </div>
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              <div class="flex flex-col gap-2">
                <select name="Model" class="font-normal rounded border-2 p-1">
                  <option value="Без фильтра" selected>Без фильтра</option>
                  <option value="1">1</option>
                  <option value="2">2 </option>
                </select>
                <p>
                  Модель
                </p>
              </div>
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              <div class="flex flex-col gap-2">
                <select name="Model" class="font-normal rounded border-2 p-1">
                  <option value="Без фильтра" selected>Без фильтра</option>
                  <option value="1">1</option>
                  <option value="2">2 </option>
                </select>
                <p>
                  Исполнение
                </p>
              </div>
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              <div class="flex flex-col gap-2">
                <select name="Model" class="font-normal rounded border-2 p-1">
                  <option value="Без фильтра" selected>Без фильтра</option>
                  <option value="1">1</option>
                  <option value="2">2 </option>
                </select>
                <p>
                  Комплект
                </p>
              </div>
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              Пользователь
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              Дата выпуска
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              Дата поверки
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              Дилер
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              Клиент
            </th>
            <th scope="col" class="pe-3 py-2 align-bottom">
              Комментарий
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b-2 hover:bg-gray-100">
            <th scope="row" class="pe-3 py-2">
              1
            </th>
            <td class="pe-3 py-2">
              2
            </td>
            <td class="pe-3 py-2">
              3
            </td>
            <td class="pe-3 py-2">
              4
            </td>
            <td class="pe-3 py-2">
              5
            </td>
            <td class="pe-3 py-2">
              6
            </td>
            <td class="pe-3 py-2">
              7
            </td>
            <td class="pe-3 py-2">
              8
            </td>
            <td class="pe-3 py-2">
              9
            </td>
            <td class="pe-3 py-2">
              10
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>