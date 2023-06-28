<template>
  <PgTable
    @current-change="currentChange"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    :tableList="tableData"
    :clos="cloConfig"
    border
    @sort-change="tableChange"
    @filter-change="filterChange"
  >
    <template #status="{ row }">
      <el-input v-model="row.status" :placeholder="row.status" />
    </template>
  </PgTable>
</template>

<script>
import PgTable from "@/components/table/Pg-table.vue"
import axios from "axios"
import dayjs from "dayjs"

export default {
  components: {
    PgTable,
  },
  data() {
    return {
      cloConfig: [
        {
          type: "selection",
          pro: this.selectionList,
        },
        {
          type: "text",
          prop: "modelCode",
          label: "模型服务code",
          tooltip: true,
          filters: [
            { text: "a", value: "a" },
            { text: "b", value: "b" },
          ],
        },

        {
          type: "function",
          prop: "ctime",
          sortable: "ctime",
          label: "创建时间",
          filters: [
            { text: "a", value: "a" },
            { text: "b", value: "b" },
          ],
          callback: (row) => {
            if (row.ctime) {
              return dayjs(row.ctime).format("YYYY-MM-DD HH:ss:hh")
            } else {
              return ""
            }
          },
        },
        {
          type: "slot",
          slotName: "status",
          prop: "status",
          label: "状态",
        },
        {
          type: "operation",
          label: "操作",
          actionButtons: [
            {
              label: "编辑",
              type: "text",
              size: "small",
              checkPermission: Boolean,
              checkDisabled: Boolean,
            },
            {
              label: "删除",
              type: "text",
              size: "small",
              checkPermission: Boolean,
              checkDisabled: Boolean,
            },
            {
              label: "复制",
              type: "text",
              size: "small",
              checkPermission: Boolean,
              checkDisabled: Boolean,
              callback: (row, operationRow) => {
                this.copy(row, operationRow)
              },
            },
            {
              label: "上线",
              type: "text",
              size: "small",
              checkPermission: this.onLine,
              checkDisabled: Boolean,
            },
            {
              label: "下线",
              type: "text",
              size: "small",
              checkPermission: this.offLine,
              checkDisabled: Boolean,
            },
          ],
        },
      ],
      tableData: [],
      selectionList: [],
    }
  },

  async created() {
    const { data } = await axios.post(
      "https://www.fastmock.site/mock/5dcdfdf3ea150ebfdde9a3b42e5fda8a/modelpredict/modelpredict/federal/multiQuery"
    )
    this.tableData = data.data.modelList
  },

  methods: {
    getDataSourceContent(row) {
      if (row.datasource instanceof Array) {
        const content = row.datasource.join("，")
        return content
      }

      return ""
    },
    copy(row, operationRow) {
      console.log("row,operationRow", row, operationRow)
    },
    tableChange(column, prop, order) {
      console.log("asd", column, prop, order)
    },
    filterChange(filters) {
      console.log("filterChange", filters)
    },
    offLine(row) {
      return row.status === 0
    },
    onLine(row) {
      return row.status !== 0
    },
    currentChange(cur) {
      console.log(cur)
    },
  },
}
</script>

<style></style>
