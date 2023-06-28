<template>
  <div class="container">
    <el-table :data="tableList" v-bind="$attrs" v-on="$listeners">
      <template v-for="(clo, inx) in clos">
        <el-table-column
          :key="clo.id"
          v-if="clo.type === COL_TYPE.selection"
          type="selection"
          width="54"
        />

        <el-table-column
          :key="inx"
          v-if="clo.type === COL_TYPE.text"
          :label="clo.label"
          :prop="clo.prop"
          :sortable="clo.sortable"
          :filters="clo.filters"
          :show-overflow-tooltip="clo.tooltip"
          :width="clo.width"
        />

        <el-table-column
          :key="inx"
          v-if="clo.type === COL_TYPE.function"
          :label="clo.label"
          :prop="clo.prop"
          :sortable="clo.sortable"
          :filters="clo.filters"
          :show-overflow-tooltip="clo.tooltip"
          :width="clo.width"
        >
          <template slot-scope="{ row }">
            {{ clo.callback(row, clo) }}
          </template>
        </el-table-column>

        <el-table-column
          :key="inx"
          v-if="clo.type === COL_TYPE.slot"
          :label="clo.label"
          :prop="clo.prop"
          :sortable="clo.sortable"
          :show-overflow-tooltip="clo.tooltip"
          :filters="clo.filters"
          :width="clo.width"
        >
          <template slot-scope="{ row }">
            <slot :name="clo.slotName" :row="row"> </slot>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column
          :key="inx"
          v-if="clo.type === COL_TYPE.operation"
          :label="clo.label"
        >
          <template slot-scope="{ row }">
            <div style="display: flex">
              <div v-for="btnItem in clo.actionButtons" :key="btnItem.label">
                <!-- checkPermission按条件显隐、 checkDisabled按条件禁用 -->
                <el-button
                  style="margin-left: 10px"
                  v-if="btnItem.checkPermission(row)"
                  :disabled="!btnItem.checkDisabled(row)"
                  :type="btnItem.type || 'text'"
                  :size="btnItem.size"
                  :icon="btnItem.icon"
                  @click="btnItem.callback && btnItem.callback(row, btnItem)"
                >
                  {{ btnItem.label }}
                  <slot :name="btnItem.slotName" :row="row"> </slot>
                </el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-row type="flex" justify="end" style="margin-top: 10px">
      <el-pagination
        v-if="isShowPagination"
        class="el-pagination"
        v-bind="$attrs"
        v-on="$listeners"
      />
    </el-row>
  </div>
</template>

<script>
import { COL_TYPE } from "@/common/common.js"

export default {
  name: "PgTable",
  data() {
    return {
      COL_TYPE,
    }
  },
  props: {
    tableList: {
      type: Array,
      default: () => [],
    },
    clos: {
      type: Array,
      default: () => [],
    },
    isShowPagination: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style></style>
