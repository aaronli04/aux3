import React from "react"
import { getPCN } from "@/utils/classes"
import CreateRoomComponent from "./CreateRoomComponent"

const className = 'create'
const pcn = getPCN(className)

export default function CreateComponent() {
  return (
    <div className={className}>
      <div className={pcn('__liner')}>
        <CreateRoomComponent />
      </div>
    </div>
  )
}