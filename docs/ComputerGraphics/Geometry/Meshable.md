# Locally Meshable Frame Fields
# 简介
在基于标架场的六面体网格生成算法中，对鲁棒性影响最大的问题就是不可网格化的拓扑参数（`non-meshable topological configurations`）。它们在对标架场进行平滑时会产生，但是却无法构造整数网格映射（`integer-grid map`）
1. 可以将non-meshable的标架场转换为近似的meshable的标架场

不足：
需要对zipper nodes进行严格的限制
局部可网格化只是全局可网格化的必要非充分条件。  
给定一个可网格化的标架场，目前没有算法可以保证能够找到一个具有唯一拓扑结构的无缝映射。

# 背景
首先回顾一下典型的整数网格映射流程：
1. 特征对齐的标架场
2. 无缝参数化
3. 整数化
4. 整数网格映射
5. 六面体化网格

目前，步骤2、4可以分别通过[Bruckler et al. 2022](https://dl.acm.org/doi/abs/10.1145/3528223.3530123)的整数化算法和[Lyon et al. 2016](https://dl.acm.org/doi/abs/10.1145/2897824.2925976)的线性网格提取算法鲁棒的完成，其余步骤仍然不稳定。

## 标架场的可网格性（Meshability）
鲁棒性差最主要的来源是标架场和整数网格之间的拓扑错位（`topological mismatch`），


# 2d网格的meshablity
## 2d向量场的拓扑
### 局部向量场拓扑
对于一个向量场， $v(\boldsymbol{x}):\Omega\rightarrow \mathbb{R}^2$ ，如果某处（点、线、面）的 $||v(\boldsymbol{x})||_2=0$ ，那么该处被称为`singularities`（奇异点）。在奇异点的局部邻域中，`streamline`（流线）根据其向前和向后流动方向，可以有四种分类：

- `closed orbit`：环绕奇点形成封闭路径。
- `parabolic`（抛物线）：往一个方向收敛和往另外一个方向发散。如果前进的方向是收敛的叫做`inflow`，否则叫`outflow`。
- `hyperbolic`（双曲线）：在两个方向上都发散。
- `elliptic`（椭圆线）：在两个方向上都收敛。

通过对局部邻域 $D_\epsilon$ 的边界环 $\partial{D_\epsilon}=C_\epsilon$ 上穿过的所有`streamline`的类型和顺序可以确定奇异点的类型。

![alt text](image-8.png)

- 如图（a）所示：某个奇异点邻域的向量场拓扑。由绿色的抛物线（parabolic）、蓝色的双曲线（hyperbolic）、红色的椭圆线（elliptic）形式的`streamline`组成领域下的了5个部分。
- （b）全局的向量场拓扑，整体的拓扑结构由所有的黄色分离线（separatrices）组成，将空间分割成具有相同流动动行为的区域，可能存在封闭环（`closed orbit`）。其中，绿色的极限环（`limit cycle`）是收敛至封闭环的`streamline`

`separatirx`（分割线）是由`elliptic`和`parabolic`在划分空间时产生的。
> 一个观察：`elliptic`和`parabolic`因为都经过了`singularity`，所以能够产生分割线，而`hyperbolic`不会经过`singularity`，所以它只能逼近分割线。

一个内部奇异点的的`index`量化了：沿着 $C_\epsilon$ 逆时针遍历时，向量场旋转了多少周：

$$
I=1-\frac{1}{2}n_h+\frac{1}{2}n_e
$$

-  $n_h$ 、 $n_e$ 分别是关于`hyperbolic`和`elliptic`的`streamline`数量。
-  $n$ 前面的符号表示是逆时针还是顺时针。
-  $n_h$ 、 $n_e$ 总是偶数，从而 $I$ 永远是整数。

### 全局向量场拓扑
局部拓扑骨架（`topological skeleton`）通过将域划分为有相同流动模式（identical asymptotic flow behavior.）的子域，编码向量场的全局拓扑。在全局尺度上，还有一种额外的`streamline`类型，被称作`limit cycle`，它渐渐收敛为一个`closed orbit`。如下图绿色曲线所示：  

![alt text](image-10.png)

### 局部标架场拓扑
二维标架由3个 $\mathbb{R}^2$ 构成。它们每对都是不平行的，通常定义为一个矩阵 $F$ ：

$$
\{u,v,-u,-v\}， F=[u,v]\in{\mathbb{R}^{2\times 2}}
$$

- 对于非奇异点： $||F||_2\ne0$ ，要求 $\det{F}>0$ 可以使得u方向的`streamline`（`u-streamlines`）永远不会与v方向的`streamline`（`v-streamlines`）平行，并且标架向量还不会消失。即：确保标架不会退化。

用**代数拓扑**的语言描述，一个标架场对应一个4层分歧覆叠空间（4-sheeted branched cover）。每个分歧点对应了 $\{u,v,-u,-v\}$ 中的一项。但是，使用CCW顺序遍历分割线时，每个分割线可能属于不同的分歧层（即可能是u或者v或者-u或者-v的分割线）。
举个例子：一个`outflow`的u分割线的后续肯能是一个`outflow`的v分割线。但是，两个**CCW**连续的分割线，只可能是下面这几种情况：
1. 两个连续的分割线处于同一个分歧（`branch`）
2. 是下一个分歧（`branch`）(以 $\{u,v,-u,-v\}$ 为例， $v$ 下一个只能是 $-u$ )
3. 是上一个分歧（`branch`）(以 $\{u,v,-u,-v\}$ 为例， $v$ 上一个只能是 $u$ )
> 即：分割线的相邻性可以用 $\{u,v,-u,-v\}$ 的相邻性表达

例子：一个`outflow`的u分割线（即对应 $\{u,v,-u,-v\}$ 中的 $u$ ）的后续只能是
1. 同样的`outflow`的u分割线，
2. 是`outflow`的v分割线（即对应 $\{u,v,-u,-v\}$ 中的 $v$ ）
3. 是`inflow`的v分割线（即对应 $\{u,v,-u,-v\}$ 中的 $-v$ ）

在这三种分类下，可以把空间的部分划分为三类：`polar`、`quad`、`anti-quad`：
![alt text](image-11.png)
![alt text](image-12.png)

- 左图中，从最右边那条黄色分割线开始（这条线是`outflow`的u分割线，对应 $u$ ），以CCW顺序遍历其余的黄色分割线。右图则是不同类别分割线所划分的区域的类型。
- 它的下一条分割线是`outflow`的v分割线，对应 $v$ ，所以他们之间的区域，如右图所示，是从 $u$ 指向 $v$ ，对应`quad`区域。
- `outflow`的v分割线的下一条分割线仍然是`outflow`的v分割线，所以它们之间的区域，是从 $v$ 指向 $v$ ，对应`polar`区域。
- 最后，从`outflow`的v分割线回到了`outflow`的u分割线。所以它们之间的区域，是从 $v$ 指向 $u$ ，对应`anti-quad`区域。

从而，一个奇异点的`index`相应的可以用以下公式表示：
$$
I=1-\frac{1}{4}n_q+\frac{1}{4}n_a
$$

-  $n_q$ 、 $n_p$ 、 $n_a$ 分别表示`quad`、`polar`、`anti-quad`的数量


## 2d标架场的meshability
定义：`meshable`指的是，一个四边形网格存在一个唯一的拓扑。

在四边形网格上，四边形的边可以被理解成目标标架场`streamline`的离散表示。同样的，一个离散流线`discrete streamline`会穿过常规顶点，会形成封闭的环也可能在边界点或奇异点处停止。

### meshability condition
1. 特征对齐（`Feature Alignment`）:标架场与所有的特征曲线对齐，确保正确的构造四边形网格。
2. 孤立的奇异结构（`Isolated Singularities`）:所有满足 $||F||_2=0$ 的奇异结构都是奇异点，不存在可能导致网格退化的奇异线或者奇异面（curve or patch singularities）。
3. 只有四边形（`Quad sectors only`）：标架场不能由`polar`和`anti-quad`区域。这些区域会导致非四边形单元的产生。
4. 不存在极限环（`No limit cycles`）：网格诱导的标架场拓扑的所有`streamline`，要么是`closed orbits`，要么在奇点或者边界处终止。

### 区域修改以确保Local meshability
> 局部可网格化要求满足条件1、2、3。条件4可以略去，只有在全局尺度上考虑时有关 。

当给定一个标架场只满足条件1、2时，通过修改其奇点的 $\epsilon$ 邻域 $\mathcal{N}$ ，是可以让他也满足条件3的：

![alt text](image-13.png)

- 上图a->b。a是一个`polar`类型的区域，可以添加一个`index`满足 $I=\frac{1}{4}$ 的奇点，使得`polar`区域可以转换为`quad`区域。这种转换，不会影响到其他区域。
- 同样的，上图b-c。`anti-quad`区域可以转换为`quad`区域，只需要添加2个 $I=\frac{1}{4}$ 的奇点。

使用 $\Delta n_a$ 、 $\Delta n_q$ 来表示改变前后的变化量。
- 对于a->b。在原始奇点处，相当与新增了一个`quad`区域，而在在新增奇点处，实际上移除了一个`quad`区域，所以这记为 $\Delta n_a=\Delta n_q=0$
- 对于c->d。在原始奇点处，移除了一个`anti-quad`区域，新增了一个`quad`区域；在新增奇点处，都分别移除了一个`quad`区域。所，记为 $\Delta n_a=\Delta n_q=-1$
> 具体算法可以见 [Myles et al. 2014](https://d1wqtxts1xzle7.cloudfront.net/80303719/14fieldtrace-libre.pdf?1644127037=&response-content-disposition=inline%3B+filename%3DRobust_field_aligned_global_parametrizat.pdf&Expires=1763023467&Signature=CWcjoJiJr5xBCJaoba2vfdwNUH03SZmJhiC58Mgt9NkkxWhwNfVm7uPcqmbNczD4j555u92Uzc2ARksI378vKxwVhExqE3FkrjkigeyfIVw9ewVuyhUSy~eAgtJmbxoxwJylqcHG-s~llqBdQfuhM8Zhee96iEN303iIJAbkSAlsBwURBOER9Qjpp49Gm1-NSAIEwF~hEt2LPV20zZVZ77oJUhgQBvARYhL3QhG6CK~CjBRcphfzpvIaZ~U9A6nXixbu2a543VsaeM5aabcSSICt3BOhzPbPoYDvslgBOHs7VXRr-Vh84WMxxNeenZsBJvhUG6cUhNO3a~LrUvSBZQ__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA)

最后，如果一个标架场是`local meshable`的，可以通过[Myles et al. 2014](https://arxiv.org/pdf/2112.05793)提出的基于`motorcycle graph`的算法使其`globally meshable`。

## 3d标架场的meshability
同样的，hex mesh也可以视为3d标架场的`streamline`的离散表示。其中的奇异结构主要包含`nodes`和`flow-aligned arcs`，可以用奇异图（`singularity graph`）表示。但是，不同与2d情况，它主要由2个情况：
1. `streamsurface`的不唯一性。
2. 奇异弧（`singular arcs`）的存在。

![alt text](image-14.png)

### Streamsurface
`streamline`可以通过三维空间的向量场 $u(x):\mathbb{R}^3\rightarrow\mathbb{R}^3$  的积分唯一的确定。但是如果两个向量场 $u(x):\mathbb{R}^3\rightarrow\mathbb{R}^3$ 和 $v(x):\mathbb{R}^3\rightarrow\mathbb{R}^3$ 组合构造的`streamsurface`却并不能唯一的构造。以下图为例。

![alt text](image-15.png)

即`streamsurface`的形状由这一块区域的向量场决定。然而，一个重要的点：

只由当向量场是可积的时候，即满足Frobenius定理[Frankel et al. 2011](The Geometry of Physics: An Introduction)的充要条件时，`streamsurface`才能被明确定义！

> 即对于区域内的任意一处满足 $s_{uv}=s_{vu}$ 

所以，只有**保证了`streamsurface`的可积性**，才能明确的定义一个`well-defined`的`streamsurface`将空间划分为hex。

### 奇异弧（Singular Arcs）
一个2d标架场的局部邻域被称为`footprint`。沿着另一个轴，形成一个扫掠体（`sweep`）。那么中间会形成一条 `flow-aligned singular arc`，如果奇点周围都`quad`区域，那么这个扫掠体被叫做`meshable singular arc`。`flow-aligned singular arc`的`index`就是其`footprint`的`index`。

![alt text](image-16.png)

六面体网格诱导的标架场仅包含`meshable singular arcs`，但是一般的标架场允许`non meshable singular`类型，可能会存在以下缺陷：
1. 复合单值路径（`Compound Monodromy`）：
2. 流错配（`Flow Misalignment`）：奇异弧与标架场不是相切的，见下图
3. 非常数邻域（`Non-constant Footprint`）：虽然流对齐弧的`index`是常数，但是`sector`任然可以沿着弧变化并同时保持`index`不变。比方说：一条孤立的分界线可以变成一个`polar`区域或者变成一对`hyperbolic`区域或者变成一对`elliptic`区域（因为这样分裂并不会改变`index`）。
4. 不可网格化邻域（`Non-meshable Footprint`）：有些网格不满足条件3（只能有4边形）

奇异弧有一个单值（`monodromy`） $\mu$ ，描述了沿着环绕奇异弧的环移动时所经历的旋转。八面体群（`octahedral group`） $\mathcal{O}$ 中的一个元素。

24种八面体群元素种，只有10种是围绕着标架的一个轴旋转的，并且可以生成`meshable`的奇异弧。其余14种是复合类型（`compound type`），其无法生成`meshable`的奇异弧，且 $\text{rank}(F)=1$。

### Arc Zipping
对奇异弧和奇异节点进行调整的一个基本操作是`zipping`和`unzipping`：
![alt text](image-17.png)
- `zipping`：有两条平行的`flow-aligned singular arc` $A_1$ $A_2$，其`index`分别为 $I_1$ 和 $I_2$ 。把它们合并成为一条新的`flow-aligned singular arc` $A_z$ 。这个操作叫做`zipping`。且，结果奇异弧的`index`为 $I_z=I_1+I_2$ 。
-`zipper nodes`：在`zipping`和`unzipping`前后，都会产生一个奇异节点，称为`zipper nodes`。

`arc zipping`操作其实是2d上插入节点修改区域类型的的一种推广。比方说：
- 一条常规`streamline`，即 $I=0$ 的`flow-aligned singular arc`，可以被`unzipped`为拥有相反`Index` $I_1=-I_2$ 的两条奇异弧.

