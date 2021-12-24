import { createApp, reactive } from "https://unpkg.com/petite-vue@0.3.0/dist/petite-vue.es.js"

const store = reactive({status: "notstarted"})

function App() {
  const title = "Задача: сделать адаптивный вебсайт с vue и petite-vue"
  const key = "testKey"
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur enim dui, eu pellentesque diam fringilla nec. Suspendisse molestie lacus velit, sit amet luctus ipsum tincidunt quis. Etiam sed tortor tellus. Nulla ligula justo, bibendum eget pulvinar ut, eleifend a lectus. Nunc laoreet magna in tortor luctus luctus. Duis sit amet massa et ipsum rhoncus facilisis in id ex. In pretium viverra lacus. Nullam nisl nisl, rhoncus ut scelerisque eget, elementum vitae orci. Curabitur at dapibus eros.

  Sed porta eu eros eu sodales. Suspendisse lacus ex, efficitur nec scelerisque sed, hendrerit sit amet ipsum. Vestibulum eu diam turpis. In posuere dolor at ipsum facilisis placerat. Nam bibendum faucibus tellus non euismod. Morbi lacinia arcu eu neque molestie tincidunt. Aenean convallis tellus non cursus efficitur. Nam elementum et nibh eu semper. Etiam ultrices aliquet velit in rhoncus. Aliquam congue nec dolor in finibus.`

  const toNotStarted = async () => {
    if (await moveToStatus(key, "notstarted"))
      store.status = "notstarted"
  }
  const toInProgress = async () => {
    if (await moveToStatus(key, "inprogress"))
      store.status = "inprogress"
  }
  const toDone = async () => {
    if (await moveToStatus(key, "done"))
      store.status = "done"
  }
  const obj = {
    title,
    key,
    description,
    buttonsFns: {
      toNotStarted, toInProgress, toDone,
    },
  }
  return obj
}

function TaskTitle(title, status) {
  return {
    $template: "#task-title",
    title,
    mappedStatus: () => STATUS_MAP[store.status],
  }
}

const TaskButtons = (props) => ({
  $template: "#task-buttons", ...props,
})

const Description = (text) => ({
  $template: "#description",
  description: { text },
})

const Comments = () => ({
  $template: "#comments",
  comments: [
    { text: "I think this is crazy!🔥🔥🔥" },
    { text: "But is it correct?" },
    { text: "I don't know" },
  ],
})

const CommentBox = () => ({
  $template: "#comment-box",
})

const progressiveDirective = (ctx) => {
  setTimeout(() => {
    const mount = document.getElementsByTagName("head")[0];
    [ "<%= chunkVendors %>", "<%= mainChunk %>" ].map(src => {
      const tag = document.createElement("script")
      tag.src = src
      return mount.appendChild(tag)
    });
    ["<%= cssChunk %>"].map(src => {
      const tag = document.createElement("link")
      tag.href = src
      tag.rel = "stylesheet"
      return mount.appendChild(tag)
    })
  }, 0)
}

createApp({
  App,
  TaskTitle,
  TaskButtons,
  Description,
  Comments,
  CommentBox,
  store,
})
  .directive('progressive', progressiveDirective)
  .mount()

