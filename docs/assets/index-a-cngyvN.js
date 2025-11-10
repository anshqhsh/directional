import{r as s,j as l}from"./index-DJwDln9w.js";import{g as p,c as o,E as c,e as d}from"./chart-colors-BOevQg0J.js";function g({data:r}){const n=s.useMemo(()=>{if(!r||r.length===0)return{title:{text:"데이터가 없습니다"},xAxis:{type:"category",data:[]},yAxis:{type:"value"},series:[]};const a=p(),i=[...r].sort((t,e)=>e.popularity-t.popularity);return{tooltip:{trigger:"axis",axisPointer:{type:"shadow"},formatter:t=>{if(!t||t.length===0)return"";const e=t[0];return`
            <div>
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">${e.name}</div>
              <div style="color: #6b7280;">인기도: ${e.value}%</div>
            </div>
          `},backgroundColor:"white",borderColor:"transparent",textStyle:{color:"transparent"}},grid:{left:"5%",right:"5%",bottom:"5%",top:"10%",containLabel:!0},xAxis:{type:"category",data:i.map(t=>t.brand),axisLabel:{color:o["gray-500"],rotate:45,interval:0},axisLine:{lineStyle:{color:o["gray-200"]}}},yAxis:{type:"value",name:"인기도 (%)",nameTextStyle:{color:o["gray-500"]},min:0,max:100,axisLabel:{color:o["gray-500"],formatter:"{value}%"},axisLine:{lineStyle:{color:o["gray-200"]}},splitLine:{lineStyle:{color:o["gray-200"],opacity:.3}}},series:[{name:"인기도",type:"bar",data:i.map(t=>t.popularity),itemStyle:{color:a[0]},emphasis:{itemStyle:{shadowBlur:10,shadowColor:"rgba(0, 0, 0, 0.3)"}}}],color:a}},[r]);return l.jsx("div",{className:"w-full h-full",children:l.jsx(c,{echarts:d,option:n,style:{height:"100%",width:"100%"},notMerge:!0,lazyUpdate:!0})})}function x({data:r}){const n=s.useMemo(()=>{if(!r||r.length===0)return{title:{text:"데이터가 없습니다"},series:[]};const a=p(),i=[...r].sort((t,e)=>e.popularity-t.popularity);return{tooltip:{trigger:"item",formatter:t=>`
            <div style="padding: 8px 12px; background: white; border: 1px solid #e5e7eb; border-radius: 6px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 12px;">
              <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">
                <span style="color: ${t.color}; margin-right: 6px;">●</span>
                ${t.name}
              </div>
              <div style="color: #6b7280;">
                인기도: ${t.value}% (${t.percent.toFixed(1)}%)
              </div>
            </div>
          `,backgroundColor:"white",borderColor:"transparent",textStyle:{color:"transparent"}},legend:{show:!0,orient:"vertical",left:"left",top:"center",textStyle:{color:o["gray-700"],fontSize:12},itemWidth:14,itemHeight:14,formatter:t=>{const e=i.find(u=>u.brand===t);return e?`${t} (${e.popularity}%)`:t}},series:[{name:"커피 브랜드",type:"pie",radius:["40%","70%"],center:["60%","50%"],avoidLabelOverlap:!1,itemStyle:{borderRadius:8,borderColor:"#fff",borderWidth:2},label:{show:!1},emphasis:{label:{show:!0,fontSize:14,fontWeight:"bold"}},data:i.map((t,e)=>({name:t.brand,value:t.popularity,itemStyle:{color:a[e%a.length]}}))}],color:a}},[r]);return l.jsx("div",{className:"w-full h-full",children:l.jsx(c,{echarts:d,option:n,style:{height:"100%",width:"100%"},notMerge:!0,lazyUpdate:!0})})}export{g as CoffeeBrandsBarChart,x as CoffeeBrandsDonutChart};
