# Mint Discretely Integrable Moments for Symmetric Frame Fields
# TLDR
本文提出的方法能够自动恢复具有复杂拓扑的场，其能够对于实际中的复杂几何构造参数化。

#
we show that discrete (local) integrability of a symmetric frame field on a tetrahedral volume mesh can be expressed as `linear constraints` on `certain tensor representations of the field` (where the entries of these tensors are polynomials in the natural representation of a frame field, as 9 DOFs per point).

# MINT
基于张量矩的可积约束（Moment-based Intergrability constraint）


# 标架场和八面体群
Frame field是一个 $2^3$ 向量场（ $2^3$ -vector field），对于属于三维空间 $\mathbb{R}^3$ 的区域 $\Omega$ 中每个点 $p$ 的一个三维标架场可以如下表示：

$$
\{f_1(p),f_2(p),f_3(p)\}
$$

记矩阵 $\mathrm{F}\in \mathbb{R}^{3\times 3}$ 中的每一列保存了 $f_i$

记 $\mathcal{O}$ 为一个八面体群（octahedral group），那么其中每一个元素 $g\in \mathcal{O}$ 可以表示为两个矩阵的乘积 $g=\mathrm{DP}$ ，其中：
- $\mathrm{D}$ 是一个对角阵，对角线元素为 $\pm1$
- $\mathrm{P}$ 是一个置换矩阵，

一个八面体群通过右乘，作用在一个矩阵上，会改变这个矩阵列的**顺序**，也会改变列的**符号**

给定2个矩阵：

$$
\mathrm{F}=[f_1,f_2,f_3] \quad \mathrm{G}=[g_1,g_2,g_3]
$$

如果存在一个 $g$ 满足 $\mathrm{F}=\mathrm{G}g$ ，那么 $F$ 和 $G$ 表示的是同一个标架场，记做 $\mathrm{F}\sim\mathrm{G}$ 

用 $\mathbb{R}^{3\times3}/\mathcal{O}$ 表示3对称方向标架（3-symmetric direction frames）的商空间（quotient space）， $GL(3)/\mathcal{O}$ 表示上述空间的非退化的空间（即线性无关的）。
>注意， $GL(3)/\mathcal{O}$ 虽然在局部邻域上是欧式空间的，但是其的三个方向 $f_i$ 每个都有不同的尺度，所以该空间并非流形。所以，每个  $2^3$ 向量场是 $\Omega \times \mathbb{R}^{3\times3}/\mathcal{O}$ 中的一个片段 $\Gamma$ 。

在远离奇异点和奇异线的区域，可以局部梳理（comb）标架场，即在邻域内的每个点上找到3个满足 $\mathrm{C}\sim\mathrm{F}$ 的向量场 $c_i$ 。但是，由于标架场奇异线上存在`拓扑位错`，一般不可能将这种局部梳理（combing）推广到全局分裂为3个光滑的向量场。

> 注意，八面体标架（octahedral frames）是八面体群（octahedral group）的子集。

之前有许多工作使用八面体标架（octahedral frames）来处理hex，可以减少高各向异性的标架、退化的标架（共面或者0维的）产生。但是八面体标架不利于积分。一个可以积分的标架意味着存在一个局部共形参数化。

即使施加很轻微的约束（比如对其标架至边界）， 都无法找到一个可积的八面体标架，因为三维的共形变换很少（只有Möbius transformations）。


近些年

# 概览
首先对体积 $\Omega$ 离散化为tet，并且每个tet代表一个对称标架 $F\in \mathbb{R}^{3\times3}$ 。那么 $F$ 中的每一项就是优化目标。但是，由于所有矩阵 $Fg$ 都表示 $\mathbb{R}^{3\times 3}/\mathcal{O}$ 中的同一个对称标架。所以，优化能量函数 $f$ 需要对八面体群中的每一个 $g$ 都满足： $f(Fg)=f(F)$ 。

为此，这个论文对于标架场 $L(F)$ ，使用其对称三张量矩表示（3-tensor moment representation）来定义能量和约束，而不是直接对 $F$ 定义能量和约束。


# 提升和k阶矩（Lifts and k-th moments）

如果一个区域中3个方向的向量值不同，该区域的元素在 $GL(3)/\mathcal{O}$ 中有一个唯一表示：

$$
M_2=\sum_i \boldsymbol{f}_i \boldsymbol{f}_i^{T}
$$

其中，$M_2$ 的特征向量是其标架向量，特征值为 $||\boldsymbol{f}_i||^2$  
在 $\mathbb{R}^{3\times 3}/\mathcal{O}$ 中，这个映射不是单射，但是仍然有用，因为，对于任何一个标架 $\boldsymbol{F}$ 和其变换 $\boldsymbol{FDP}$ ，都有：

$$
M_2=\sum_i \boldsymbol{f}_i \boldsymbol{FDP}^T \boldsymbol{D}^T \boldsymbol{f}_i^T
$$

高阶张量积可以用类似的方式对称化 $\boldsymbol{F}$ ，对于 标架 $\boldsymbol{F}$ 的提升`lift` $L_k$ ，记作k阶对称张量矩（kth order symmetric moment tensor）的形式：

$$
L_k(\boldsymbol{F})=\sum_i \boldsymbol{f}_i^{\otimes k}
$$

> 当 $k$ 是偶数时，这个`lift`对于八面体群中的每一个元素 $g\in\mathcal{O}$ 满足对称性 $L_k(F)=L_k(Fg)$ 。所以，这个`lift`是一个从 $\mathbb{R}^{3\times 3}/\mathcal{O}$ 到 $\mathbb{R}^{3^k}$ 的完备的映射。具体概念见论文[Palmer et al. 2020](https://dl.acm.org/doi/abs/10.1145/3366786)。

假设给定一个标架 $\boldsymbol{F}=[\boldsymbol{f}_1,\boldsymbol{f}_2,\boldsymbol{f}_3]$ ，那么他的2阶矩张量是：

$$
L_2(\boldsymbol{F})=\sum_i \boldsymbol{f}_i\otimes\boldsymbol{f}_i
=
\boldsymbol{f}_1\otimes\boldsymbol{f}_1+
\boldsymbol{f}_2\otimes\boldsymbol{f}_2+
\boldsymbol{f}_3\otimes\boldsymbol{f}_3
$$


# 核心思想
定义了一个从对称标架 $\boldsymbol{F}$ 到矩空间（space of moments）的映射： $\mathcal{M}=\mathbb{R}^{3^2}\oplus\mathbb{R}^{3^4}\oplus\mathbb{R}^{3^6}$ ：

$$
L(\boldsymbol{F})=[L_2(\boldsymbol{F}),L_4(\boldsymbol{F}),L_6(\boldsymbol{F})]
$$

> $L$ 是一个从 $\mathbb{R}^{3\times 3}/\mathcal{O}$ 到 $\mathcal{M}$ 的单射，即： $\boldsymbol{F}$ 可以从 $\{L_k(\boldsymbol{F})\}_{k=2,4,6}$ 中唯一的恢复八面体对称。

基于这种对称标架的矩表示法：
- 定义了离散对称标架的局部可积性，定义了对称标架场的光滑性的概念
- 推出了一个模型目标函数，在边界对齐的无缝参数化和整数网格参数化案例中，用于近似的恢复八面体场，使其尽可能的八面体（as-octahedral-as-possible）
- 对比了其他文献中的度量方式，用于评估什么是可积的、边界对齐的、八面体的体参数化。

# 对称标架场的可积性

## 光滑局部可积性
当一个标架场 $\boldsymbol{F}(\boldsymbol{p})$ 某个邻域 $\mathcal{N}$ 定义为`可以被梳理的（can be combed）`，指的是：对于任意远离场中的奇异结构的点 $\boldsymbol{p} \in \mathcal{N}$ ，存在3个光滑的向量场 $\boldsymbol{c}_i(\boldsymbol{p})$ 满足 $\boldsymbol{C}(\boldsymbol{p})\sim \boldsymbol{F}(\boldsymbol{p})$ 。


如果在这个可被梳理的邻域 $\mathcal{N}$ 内存在3个标量位势（scalar potentials），满足： 

$$
\boldsymbol{c}_i=\nabla \phi_i \quad \phi_i:\mathcal{N} \rightarrow \mathbb{R}
$$ 

或者，也可以等价的表示为 

$$
\nabla \times \boldsymbol{c}_i=0

$$ 

那么可以称为这个场是局部可积的。

## 离散局部可积性

在论文 [Polthier et al. 2003](https://link.springer.com/chapter/10.1007/978-3-662-05105-4_6) 中，提出了一种离散可积的方式。

对于每对共面 $\mathcal{F}$ 的tet，如果存在一个 $\sigma\in\mathcal{O}$ 满足：

$$
\boldsymbol{f}_i \cdot \boldsymbol{e} = (\boldsymbol{G} \sigma)_i \cdot \boldsymbol{e}
$$

则称一个对称标架场是局部可积的。
-  $\boldsymbol{F}$ 和 $\boldsymbol{G}$ 分别是两个tet所代表的标架场。
-  $\boldsymbol{e}$ 是 $\mathcal{F}$ 上的每条边。

如果把两个tet构成的`钻石`形状多面体，那么 $\sigma$  相当对这个`钻石`内的局部标架场进行了梳理。

基于这个定义，可以构造一个度量局部对称可积性的方式。对于一个tet，通过上述方程计算，获得每个tet face的一个标量值：

$$
Q_{\mathrm{localint}}=\min_{\sigma \in \mathcal{O}} \frac{A(\mathcal{F})}{\ell(\mathcal{F})} \sum_{\boldsymbol{e}\in \mathcal{F}} (\sum_{i=1}^3 ||\boldsymbol{f}_i \cdot \boldsymbol{e} -(\boldsymbol{G}\sigma)_i \cdot \boldsymbol{e}||^2)^2
$$

-  $A(\mathcal{F})$ 是每个face的面积
-  $\ell(\mathcal{F})$ 是两个中心之间的对偶长度

这篇论文通过使用两个相邻tet的标架场 $\boldsymbol{F}$ 、 $\boldsymbol{G}$ 诱导的 $L_k(\boldsymbol{F})$ 、 $L_k(\boldsymbol{G})$ 来表示局部可积性。使用矩张量可以消除对局部进行梳理的需求，并且可以将可积性表示为对每个标架 $\boldsymbol{F}_i$ 上每一项的的多项式约束：

$$
\begin{align*}
M_k(\boldsymbol{v}_1,\boldsymbol{v}_2,\cdots,\boldsymbol{v}_k)
&=\sum_i \prod_j \boldsymbol{f}_i \cdot \boldsymbol{v}_j \\
&=\boldsymbol{f}_1\cdot \boldsymbol{v}_1 \cdot \boldsymbol{f}_1 \cdot \boldsymbol{v}_2 \cdots \boldsymbol{f}_1 \cdot \boldsymbol{v}_k \\
&\quad + \boldsymbol{f}_2\cdot \boldsymbol{v}_1 \cdot \boldsymbol{f}_2 \cdot \boldsymbol{v}_2 \cdots \boldsymbol{f}_2 \cdot \boldsymbol{v}_k \\
&\quad+ \cdots \\
&\quad+ \boldsymbol{f}_k\cdot \boldsymbol{v}_1 \cdot \boldsymbol{f}_k \cdot \boldsymbol{v}_k \cdots \boldsymbol{f}_k \cdot \boldsymbol{v}_k\\
&=\sum_i \prod_j \boldsymbol{g}_i \cdot \boldsymbol{v}_j \\
&=N_k(\boldsymbol{v}_1,\boldsymbol{v}_2,\cdots,\boldsymbol{v}_k)
\end{align*}
$$

-  $\boldsymbol{v}_i$ 可以通过 $\mathcal{F}$ 上的边 $\boldsymbol{e}$ 构造。
- 上述等式可以简化为： $\bar{M}_k=\bar{N}_k$ 。
-  $\bar{M}_k=M_k|_{\mathcal{F}}$ 表示将 $M_k$ 限制在 $\mathcal{F}$ 的切平面
- 将 $\boldsymbol{f}_i$ 投影到 $\mathcal{F}$ 上，得到 $\boldsymbol{\pi}_i$

即，可以使用 $\mathcal{F}$ 上的两个边向量 $\boldsymbol{e}_1,\boldsymbol{e}_2$ 表示：
$$
\begin{align*}
M_k(\boldsymbol{e}_1,\boldsymbol{e}_2)
&=\sum_i \prod_j \boldsymbol{f}_i \cdot \boldsymbol{e}_j \\
&=\boldsymbol{f}_1\cdot \boldsymbol{e}_1 \cdot \boldsymbol{f}_1 \cdot \boldsymbol{e}_2  \\
&\quad + \boldsymbol{f}_2\cdot \boldsymbol{e}_1 \cdot \boldsymbol{f}_2 \cdot \boldsymbol{e}_2 \\
&\quad+ \cdots \\
&\quad+ \boldsymbol{f}_i\cdot \boldsymbol{e}_1 \cdot \boldsymbol{f}_i \cdot \boldsymbol{e}_2 \\\
\end{align*}
$$

任意选一个基来表示 $\mathcal{F}$ 的切空间，并记该切空间下 $\boldsymbol{\pi}_i$ 为 $\bar{\boldsymbol{f}}_i \in \mathbb{R}^2$ 。那么对于任意偶数 $k$ ，可以得到离散可积的必要条件：

$$
L_k(\bar{\boldsymbol{F}})=L_k(\bar{\boldsymbol{G}})
$$

-  $\bar{\boldsymbol{F}} \in \mathbb{R}^{2\times 3}$ 是由列向量 $\bar{\boldsymbol{f}}_i$ 构成的矩阵。

在实际运用中，对 $k=2,4,6$ 进行约束：

$$
E_{\mathrm{int}}= \frac{A(\mathcal{F})}{\ell(\mathcal{F})} \sum_{ \mathcal{F}} \sum_{k=1}^3 ||L_{2k}(\bar{\boldsymbol{F}})-L_{2k}(\bar{\boldsymbol{G}})||_F^2
$$

- 最外部的求和公式可以理解为，遍历tet的所有内部面 $\mathcal{F}$ 。
-  $\boldsymbol{F}$ 和 $\boldsymbol{G}$ 是 $\mathcal{F}$ 两侧tet的两个标架。
-  $A(\mathcal{F})$ 是 $\mathcal{F}$ 的面积。
-  $\ell(\mathcal{F})$ 是两个中心之间的对偶长度。
-  $||||_F$ 是F范数。

## 全局平滑
基于[Palmer et al. 2020](https://dl.acm.org/doi/abs/10.1145/3366786)，这篇论文使用了一个类似Dirichlet的能量 $||\nabla L_k(\boldsymbol{F})||_F^2$ 来平滑张量矩：

$$
E_\text{smooth}=\sum_{\mathcal{F}}\frac{A(\mathcal{F})}{2\ell(\mathcal{F})}  \sum_{k=1}^3 ||L_{2k}(\boldsymbol{F})-L_{2k}(\boldsymbol{G})||_F^2
$$

## 流程
提出了一个优化算法用于构造对称标架场 $\boldsymbol{F}$ ，从而引导一个无缝参数化。在构造标架场阶段，使用本文提出的基于张量矩的标架场表示法（moment-based frame field representation），随后，使用[CubeCover](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-8659.2011.02014.x)算法，在参数化 $\boldsymbol{\phi}$ 中，集成构造的标架场 $\boldsymbol{F}$ 。

## 构造能量 
### 正交性
第一个能量用于控制对称标价场中的每对向量标架相互正交（`“odeco”`=orthogonal decomposable）

$$
E_\text{ortho}=\sum_{\tau}\frac{V(\tau)}{2}\sum_{i\neq j}(\boldsymbol{f}_i\cdot \boldsymbol{f}_j)^2
$$

-  $\tau$ 指的是每个tet
-  $V(\tau)$ 指每个tet的体积
- 这里的求和符号代表遍历所有与标价场 $\boldsymbol{F}$ 相关，且体积等于 $V(\tau)$ 的tet $\tau$

### 单位化
第二个能量用于使对称标架场中的每个向量尽可能的接近单位向量（as-unit-as-possible）

$$
E_\text{unit}=\sum_{\tau}\frac{V(\tau)}{2}\sum_{i=1}(||\boldsymbol{f}_i||-1)^2
$$

### 平面对齐
给定一个方向 $\boldsymbol{d}$ ，它代表一个平面。这个能量用于惩罚偏离该平面的标架向量 $\boldsymbol{f}_i$ ，即，这个能量要求一个标量势 $\phi$ 的等值面（isosurface）包含 $\boldsymbol{d}$ 

$$
E_\text{plane}(\tau,\boldsymbol{d},i)=\frac{V(\tau)}{2}(\boldsymbol{d} \cdot \boldsymbol{f}_i)^2
$$

- 对于每个边界面设置这个能量，从而可以避免标架向量脱出切平面，类似[Fang et al. 2023](https://ieeexplore.ieee.org/abstract/document/9655471/)

---
通过上述能量，可以构造一个总体表达式：

$$
E_\text{mesh}=E_\text{smooth}+\lambda_\text{ortho}E_\text{ortho}+\lambda_\text{unit}E_\text{unit}+\lambda_\text{plane}E_\text{plane}
$$

- 这里，每个 $\lambda$ 取了一个经验值
-  $\lambda_\text{ortho}=0.1$
-  $\lambda_\text{unit}=10^{-5}$
-  $\lambda_\text{plane}=10^{-6}$



整体的优化问题可以表示为：

$$
\min E_\text{mesh} 
\quad \text{s.t.} 
\begin{cases}
    E_\text{int} &=0 \\
    \boldsymbol{f}_1(\mathcal{T})&=\hat{\boldsymbol{n}}(\mathcal{T}) \quad \forall \,\, \text{ghost tets} \,\, \mathcal{T}
\end{cases}
$$

在实际中，使用**牛顿迭代法**求解该优化问题：

$$
\mathfrak{F}^{i=1}
=
\arg\min_\mathfrak{F} 10^8 (\frac{1}{\lambda_\text{pen}})^i E_\text{mesh}+E_\text{int}
$$



$$
\tilde{E}_\text{int}=E_\text{int}+\lambda_\text{reg}I
$$

$$
\lambda_\text{reg}=0.1
$$
