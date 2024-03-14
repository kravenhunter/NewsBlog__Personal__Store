<script setup>
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:value"]);
const limit = ref(5000);
const width = ref("640");
const height = ref("480");
const editor = ref(
  useEditor({
    content: props.value,
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "headers_class",
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: "paragraph_class",
          },
        },
        horizontalRule: {
          HTMLAttributes: {
            class: "hr_class",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "code_block_rule",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "blockquotes_rule",
          },
        },
      }),

      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }
          if (node.type.name === "paragraph") {
            return "What’s the text content?";
          }

          return "Can you add some further context?";
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "highlight_rule",
        },
      }),
      Underline,
      Youtube.configure({
        HTMLAttributes: {
          class: "video_rule",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure({
        limit: limit.value,
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "image_rule",
        },
      }),
    ],
    onUpdate: () => {
      emit("update:value", editor.value.getHTML());
    },
  }),
);

function addVideo() {
  const url = prompt("Enter YouTube URL");
  url &&
    editor.value
      .chain()
      .focus()
      .setYoutubeVideo({
        src: url,
        width: Math.max(320, Number.parseInt(width.value, 10)) || 640,
        height: Math.max(180, Number.parseInt(height.value, 10)) || 480,
      })
      .run();
}
function addImage() {
  const url = window.prompt("URL");
  url && editor.value.chain().focus().setImage({ src: url }).run();
}
</script>

<template>
  <div class="editor_container" v-if="editor">
    <div v-if="editor" class="menu_bar_container">
      <div class="icons">
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"></path>
            </g>
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().toggleUnderline().run()"
          :disabled="!editor.can().chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor.isActive('toggleUnderline') }">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"></path>
            </g>
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"></path>
            </g>
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M17.154 14c.23.516.346 1.09.346 1.72 0 1.342-.524 2.392-1.571 3.147C14.88 19.622 13.433 20 11.586 20c-1.64 0-3.263-.381-4.87-1.144V16.6c1.52.877 3.075 1.316 4.666 1.316 2.551 0 3.83-.732 3.839-2.197a2.21 2.21 0 0 0-.648-1.603l-.12-.117H3v-2h18v2h-3.846zm-4.078-3H7.629a4.086 4.086 0 0 1-.481-.522C6.716 9.92 6.5 9.246 6.5 8.452c0-1.236.466-2.287 1.397-3.153C8.83 4.433 10.271 4 12.222 4c1.471 0 2.879.328 4.222.984v2.152c-1.2-.687-2.515-1.03-3.946-1.03-2.48 0-3.719.782-3.719 2.346 0 .42.218.786.654 1.099.436.313.974.562 1.613.75.62.18 1.297.414 2.03.699z"></path>
            </g>
          </svg>
        </button>

        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive('setTextAlign') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 6h14M5 10h10M5 14h14M5 18h6" />
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive('setTextAlign') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
            <g
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4">
              <path d="M42 19H6" />
              <path d="M42 9H6" />
              <path d="M42 29H6" />
              <path d="M42 39H6" />
            </g>
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive('setTextAlign') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 18H10m10-4H4m16-4H10m10-4H4" />
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()"
          :class="{ 'is-active': editor.isActive('toggleHighlight') }">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M15.243 4.515l-6.738 6.737-.707 2.121-1.04 1.041 2.828 2.829 1.04-1.041 2.122-.707 6.737-6.738-4.242-4.242zm6.364 3.535a1 1 0 0 1 0 1.414l-7.779 7.779-2.12.707-1.415 1.414a1 1 0 0 1-1.414 0l-4.243-4.243a1 1 0 0 1 0-1.414l1.414-1.414.707-2.121 7.779-7.779a1 1 0 0 1 1.414 0l5.657 5.657zm-6.364-.707l1.414 1.414-4.95 4.95-1.414-1.414 4.95-4.95zM4.283 16.89l2.828 2.829-1.414 1.414-4.243-1.414 2.828-2.829z"></path>
            </g>
          </svg>
        </button>
        <button
          class="menu_bar_btn"
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"></path>
            </g>
          </svg>
        </button>

        <button class="menu_bar_btn" @click="editor.chain().focus().setHardBreak().run()">
          <svg
            class="icon w-6 h-6 text-gray-200"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24">
            <g>
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M15 18h1.5a2.5 2.5 0 1 0 0-5H3v-2h13.5a4.5 4.5 0 1 1 0 9H15v2l-4-3 4-3v2zM3 4h18v2H3V4zm6 14v2H3v-2h6z"></path>
            </g>
          </svg>
        </button>
      </div>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        h1
      </button>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        h2
      </button>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        h3
      </button>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </button>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </button>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </button>
      <button class="menu_bar_btn" @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button class="menu_bar_btn" @click="editor.chain().focus().clearNodes().run()">
        clear markup
      </button>
      <button class="menu_bar_btn" @click="editor.chain().focus().toggleCodeBlock().run()">
        code block
      </button>
      <button class="menu_bar_btn" @click="editor.chain().focus().toggleBlockquote().run()">
        blockquote
      </button>
      <button class="menu_bar_btn" @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().undo().run()"
        :disabled="!editor.can().chain().focus().undo().run()">
        undo
      </button>

      <button
        class="menu_bar_btn"
        @click="editor.chain().focus().redo().run()"
        :disabled="!editor.can().chain().focus().redo().run()">
        redo
      </button>
      <button class="menu_bar_btn" @click="addImage">setImage</button>
      <div class="add-youtube">
        <button class="menu_bar_btn" @click="addVideo">YouTube video</button>
        <input id="width" type="number" v-model="width" placeholder="width" min="320" max="1024" />
        <input
          id="height"
          type="number"
          v-model="height"
          placeholder="height"
          min="180"
          max="720" />
      </div>
    </div>

    <EditorContent :editor="editor" class="editor_content_block" />
    <div class="character-count">
      {{ editor.storage.characterCount.characters() }}/{{ limit }} characters
      <br />
      {{ editor.storage.characterCount.words() }} words
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor_container {
  border: 1px solid var(--color-dark);
  border-radius: 7px;
  display: grid;
  row-gap: 20px;
  padding: 20px;
  width: 100%;
}
.menu_bar_container {
  background-color: black;
}
.menu_bar_container .menu_bar_btn {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 16px;
  background-color: transparent;
  color: var(--color-light);
  cursor: pointer;
  padding: 0.2em 0.5em;
  border: 1px solid var(--color-dark);
  border-radius: 3px;
}
</style>
