<div class="lego-tabView">
    <div class="lego-tabView__nav">

        <div class="lego-tabView__navWrap">
            <ul class="lego-navList" data-role="nav-container">
                {{each $data as data i}}
                        <li {{i===0 ? 'class=is-current' : ''}}  data-role="nav-item" {{data.attr}}>
                            {{if data.link}}
                                <a href={{data.link}} target="_blank">{{data.title}}</a>
                            {{else}}
                                <span>{{ data.title }}</span>
                            {{/if}}
                        </li>
                {{/each}}
            </ul>
            <div class="lego-navLine"></div>
        </div>
        <div class="lego-navMore"></div>
    </div>
    <div class="lego-tabView__content" data-role="panel-container">
        {{each $data as data i}}
            <div class="lego-tabView__panel {{i===0 ? 'is-show' : ''}}"></div>
        {{/each}}

    </div>
</div>
