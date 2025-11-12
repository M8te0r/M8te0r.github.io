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

用代数拓扑的语言描述，一个标架场对应一个4层分歧覆叠空间（4-sheeted branched cover）。每个分歧点对应了 $\{u,v,-u,-v\}$ 中的一项。但是，使用CCW顺序遍历分割线时，每个分割线可能属于不同的分歧层（即可能是u或者v或者-u或者-v的分割线）。
举个例子：一个`outflow`的u分割线的后续肯能是一个`outflow`的v分割线。但是，两个连续的分割线，只可能是下面这几种情况：
1. 处于一个分歧层
2. 是下一个分歧层
3. 是上一个分歧层



