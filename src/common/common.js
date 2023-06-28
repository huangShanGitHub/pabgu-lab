import { makeEnum } from "@/utils/makeEnum"

export const COL_TYPE = makeEnum([
  { value: "selection", label: "selection", alias: "SELECTION" },
  { value: "text", label: "text", alias: "TEXT" },
  { value: "function", label: "function", alias: "FUNCTION" },
  { value: "slot", label: "slot", alias: "SLOT" },
  { value: "operation", label: "operation", alias: "OPERATION" },
])
