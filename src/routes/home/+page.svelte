<script>
    import Home from './home.svx'
</script>


<svelte:head>
    <title>datatables</title>
</svelte:head>


<section>
    <aside>
        <div>
            <h1>svelte-flextable</h1>
            <p>A toolkit for creating server-side processing datatable components with Svelte</p>
        </div>
    </aside>

    <Home/>


</section>
<style>
    section{margin-left:80px;}
    aside{display:flex;justify-content:start;margin-top:32px;}
    h1 {font-size:32px;line-height:32px; text-align: left; font-weight:400; margin: 0; }
    p {margin:0;color:#676778;padding:0;line-height:16px;font-size:16px;margin:8px;}

    @media (max-width: 800px) { 
        section{margin:0;}
    }
</style>