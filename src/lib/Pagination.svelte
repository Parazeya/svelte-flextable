<script lang="ts">
  import type { DataHandler } from "$lib/core";
  export let handler: DataHandler;
  export let small = false;

  const paginationType = handler.getPaginationType();
  const pageNumber = handler.getPageNumber();
  const pageCount = handler.getPageCount();
  const pages = handler.getPages({ ellipsis: true });
  const nextCursor = handler.getNextCursor();
  const prevCursor = handler.getPrevCursor();

  function handleClick(page) {
    if (paginationType == "offset") {
      if (typeof page === "number" && $pageNumber === page) return;
      if (page === "next" && $pageNumber === $pageCount) return;
      if (page === "previous" && $pageNumber === 1) return;
    } else if (paginationType == "cursor") {
      if (page === "after" && $nextCursor == null) return;
      if (page === "before" && $prevCursor == null) return;
    }

    handler.setPage(page);
  }
</script>

{#if paginationType == "offset"}
  {#if small}
    <section>
      <button
        type="button"
        class="small"
        class:disabled={$pageNumber === 1}
        on:click={() => handleClick(1)}
      >
        &#10092;&#10092;
      </button>
      <button
        type="button"
        class:disabled={$pageNumber === 1}
        on:click={() => handleClick("previous")}
      >
        &#10094;
      </button>
      <button
        class:disabled={$pageNumber === $pageCount}
        on:click={() => handleClick("next")}
      >
        &#10095;
      </button>
      <button
        class="small"
        class:disabled={$pageNumber === $pageCount}
        on:click={() => handleClick($pageCount)}
      >
        &#10093;&#10093;
      </button>
    </section>
  {:else}
    <section>
      <button
        type="button"
        class:disabled={$pageNumber === 1}
        on:click={() => handleClick("previous")}
      >
        {@html handler.i18n.previous}
      </button>
      {#each $pages as page}
        <button
          type="button"
          class:active={$pageNumber === page}
          class:ellipse={page === null}
          on:click={() => handleClick(page)}
        >
          {page ?? "..."}
        </button>
      {/each}
      <button
        type="button"
        class:disabled={$pageNumber === $pageCount}
        on:click={() => handleClick("next")}
      >
        {@html handler.i18n.next}
      </button>
    </section>
  {/if}
{:else if paginationType == "cursor"}
  <section>
    <button
      type="button"
      class:disabled={$prevCursor === null}
      on:click={() => handleClick("before")}
    >
      &#10094;
    </button>
    <button
      class:disabled={$nextCursor === null}
      on:click={() => handleClick("after")}
    >
      &#10095;
    </button>
  </section>
{/if}

<style>
  section {
    display: flex;
  }
  button {
    background: inherit;
    height: 32px;
    width: 32px;
    color: #616161;
    cursor: pointer;
    font-size: 13px;
    margin: 0;
    padding: 0;
    transition: all, 0.2s;
    line-height: 32px;
    border: 1px solid #e0e0e0;
    border-right: none;
    border-radius: 0;
    outline: none;
  }
  button:first-child {
    border-radius: 4px 0 0 4px;
  }
  button:last-child {
    border-right: 1px solid #e0e0e0;
    border-radius: 0 4px 4px 0;
  }

  button:first-child:not(.small),
  button:last-child:not(.small) {
    min-width: 72px;
  }

  button:not(.active):hover {
    background: #eee;
  }
  button.ellipse:hover {
    background: inherit;
    cursor: default;
  }
  button.active {
    background: #eee;
    font-weight: bold;
    cursor: default;
  }
  button.disabled:hover {
    background: inherit;
    cursor: default;
  }
</style>
